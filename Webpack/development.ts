// @ts-nocheck

import common, { plugins } from "./common";
import webpack from "webpack";
import merge from "webpack-merge";

import HappyPack from "happypack";
import os from "node:os";

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const config: webpack.Configuration = merge(common, {
    output: {
        chunkFilename: "js/[name].js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: "happypack/loader?id=styles",
                    },
                ],
            },
        ],
    },
    mode: "development",
    devtool: "eval",
    plugins: [
        ...plugins,
        new HappyPack({
            id: "ts",
            threads: os.cpus().length / 2,
            threadPool: happyThreadPool,
            loaders: [
                {
                    loader: "ts-loader",

                    options: {
                        transpileOnly: true,
                        happyPackMode: true,
                    },
                },
            ],
        }),
        new HappyPack({
            id: "styles",
            threads: os.cpus().length / 3,
            threadPool: happyThreadPool,
            loaders: [
                {
                    loader: "style-loader",
                },
                {
                    loader: "css-loader",
                },
                {
                    loader: "sass-loader",
                },
            ],
        }),
    ],
    optimization: {
        minimize: false,
    },
});

export default config;
