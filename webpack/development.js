const { entry, plugins, moduleOption, resolve, output } = require("./common");
const exclude = require("./exclude");

const webpack = require("webpack");

/**
 
 type ConfigProps = webpack.Configuration & {
    devServer: webpackDevServer.Configuration;
};

*/

const rules = moduleOption.rules;

moduleOption.rules = [
    ...rules,
    {
        test: /\.s?css$/,
        exclude,
        use: [
            {
                loader: "style-loader",
            },
            {
                loader: "css-loader",
                options: {
                    importLoaders: 1,
                    modules: {
                        localIdentName: "[local]",
                    },
                },
            },
            {
                loader: "sass-loader",
            },
        ],
    },
];

const command = process.argv[process.argv.length - 1];

const config = {
    entry,
    resolve,
    plugins: [...plugins],
    output: {
        ...output,
        ...{
            chunkFilename: "js/[name].js",
            filename: "js/[name].js",
        },
    },

    mode: "development",
    // eval-source-map
    devtool: "eval-cheap-module-source-map",
    optimization: {
        runtimeChunk: true,
        minimize: false,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },
    cache: {
        type: "filesystem",
        allowCollectingMemory: true,
    },
    module: moduleOption,
    devServer: {
        compress: true,
        host: "0.0.0.0",
        port: "auto",
        historyApiFallback: true,
        client: {
            progress: true,
            overlay: {
                errors: true,
                warnings: false,
            },
        },
        watchFiles: ["node_modules/@datareachable/**/*"],
    },
};

module.exports = config;
