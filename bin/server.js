#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { merge } = require("webpack-merge");
const webpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");

require("./createdHtml")();

const rootPath = require("../webpack/rootPath");

const rootDirList = fs.readdirSync(rootPath);

const runServer = async (server) => {
    console.log("Starting server...");
    await server.start();
};

const command = process.argv[process.argv.length - 1];

const getConfig = (config) => {
    const configFile = rootDirList.find((item) => item === "datareachable.config.js");

    if (configFile) {
        const data = require(path.join(rootPath, "/datareachable.config.js"));
        config = merge(config, data);
    }

    config.context = rootPath;
    return config;
};







const setAnalysisConfig = (config) => {
    if (command.includes("analysis")) {
        const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
        const smp = new SpeedMeasurePlugin({
            outputFormat: "humanVerbose",
            loaderTopFiles: 10,
        });

        const compiler = webpack(smp.wrap(config));
        return compiler;
    } else {
        return webpack(config);
    }
};

if (command.startsWith("dev")) {
    const config = getConfig(require("../webpack/development"));

    const devConfig = config.devServer;

    delete config.devServer;

    const compiler = setAnalysisConfig(config);

    const server = new webpackDevServer(devConfig, compiler);

    runServer(server).then(() => {
        const c = require("child_process");
        const port = server.options.port;
        const serveType = server.options.server.type;
        c.exec(`start ${serveType}://localhost:${port}`);
    });
} else if (command.startsWith("build")) {
    const config = getConfig(require("../webpack/production"));

    delete config.devServer;

    const compiler = setAnalysisConfig(config);

    compiler.run((err, stats) => {
        if (err) {
            console.log(err);
        } else {
            console.log(
                stats.toString({
                    colors: true,
                }),
            );
        }
    });
}
