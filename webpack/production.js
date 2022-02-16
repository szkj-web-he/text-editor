const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { entry, plugins, moduleOption, resolve, output } = require("./common");
const webpack = require("webpack");

const rules = moduleOption.rules;
moduleOption.rules = [
    ...rules,
    {
        test: /\.s?css$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
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

// webpack.Configuration
const config = {
    entry,
    resolve,
    output: {
        ...output,
        ...{
            chunkFilename: "js/[name].[contenthash].js",
            filename: "js/[name].[contenthash].js",
        },
    },
    plugins: [
        ...plugins,
        new MiniCssExtractPlugin({ filename: "css/[name].[contenthash].css" }),
        new CompressionPlugin({ test: /\.js(\?.*)?$/i, algorithm: "gzip" }),
        new webpack.DefinePlugin({
            "process.env": command.startsWith("build-dev")
                ? { PRO_DEV: "true" }
                : {},
        }),
    ],
    module: moduleOption,
    mode: "production",
    devtool: "source-map",
    optimization: {
        chunkIds: "total-size",
        mangleWasmImports: true,
        moduleIds: "size",
        removeAvailableModules: true,
        runtimeChunk: "single",
        minimizer: [
            new TerserPlugin({
                include: /(@datareachable|@possie-engine)/,
                terserOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                    },
                },
            }),
        ],
        splitChunks: {
            chunks: "all",
        },
    },
};

module.exports = config;
