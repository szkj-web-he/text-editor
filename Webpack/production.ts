// @ts-nocheck
import common, { plugins } from "./common";
import webpack from "webpack";
import merge from "webpack-merge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";

import HappyPack from "happypack";
import os from "node:os";
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const config: webpack.Configuration = merge(common, {
    output: {
        chunkFilename: "js/[name].[contenthash].js",
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
    mode: "production",
    devtool: "source-map",
    plugins: [
        ...plugins,
        new MiniCssExtractPlugin(),
        new HappyPack({
            id: "ts",
            threads: os.cpus().length / 3,
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
                    loader: MiniCssExtractPlugin.loader,
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
        chunkIds: "total-size",
        mangleWasmImports: true,
        moduleIds: "size",
        removeAvailableModules: true,
        minimizer: [
            new TerserPlugin({
                include: /@datareachable/,
                terserOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                        booleans_as_integers: true,
                    },
                },
            }),
        ],
        splitChunks: {
            chunks: "all",
        },
    },
});

export default config;
