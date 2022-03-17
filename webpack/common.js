const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const rootPath = require('./rootPath');
const BabelConfig = require('./findRootBabel');
const exclude = require('./exclude');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const command = require('./command');

// webpack.Entry
/**
 * 入口文件
 * core-js
 * regenerator-runtime/runtime
 * 做兼容处理
 */
const entry = {
    app: ['core-js', 'regenerator-runtime/runtime', './src/index.tsx'],
};

//  webpack.ModuleOptions
const moduleOption = {
    rules: [
        {
            test: '/.ico$/',
            type: 'asset/source',
            generator: {
                filename: '/[name][query]',
            },
        },
        {
            test: '/.(woff|woff2|pdf|eot|ttf)$/',
            type: 'asset/source',
            generator: {
                filename: 'assets/[name][query]',
            },
        },
        {
            test: /.(png|jpe?g|gif|svg)$/,
            type: 'asset',
            generator: {
                filename: 'assets/[hash][ext][query]',
            },
            parser: {
                dataUrlCondition: {
                    maxSize: 20 * 1024, // 20kb
                },
            },
        },

        {
            test: /.(j|t)sx?$/,
            exclude,
            enforce: 'pre',
            use: [
                {
                    loader: 'babel-loader',
                    options: BabelConfig,
                },
            ],
        },
        {
            test: /\.(sa|sc|c)ss$/,
            use: [
                {
                    loader: command.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                        modules: {
                            localIdentName: '[local]',
                        },
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            config: path.resolve(__dirname, '../postcss.config.js'),
                        },
                    },
                },
                {
                    loader: 'resolve-url-loader',
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                    },
                },
            ],
        },
    ],
};

// webpack.ResolveOptions
const resolve = {
    alias: {
        '~': '/src',
    },
    symlinks: false,
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    modules: [path.join(rootPath, '/src'), 'node_modules'],
};

const plugins = [
    new HtmlWebpackPlugin({
        title: 'dataReachable',
        template: path.join(__dirname, '../public/index.html'),
        favicon: path.join(__dirname, '../public/favicon.ico'),
        meta: {
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            charset: 'utf-8',
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'black',
            'apple-mobile-web-app-title': 'DataReachable',
            description: 'DataReachable',
            'theme-color': '#2F3BA2',
        },
    }),

    new ForkTsCheckerWebpackPlugin({
        eslint: {
            enabled: true,
            files: './src/**/*.{ts,tsx,js,jsx}',
        },
        issue: {
            exclude: ({ file }) => {
                return file?.includes('node_modules') || false;
            },
        },
        typescript: {
            enabled: true,
            diagnosticOptions: {
                semantic: true,
                syntactic: true,
            },
        },
    }),
    new webpack.ProgressPlugin({ percentBy: 'entries' }),
];

const output = {
    publicPath: '/',
    clean: true,
    path: path.join(rootPath, '/build'),
    pathinfo: false,
};

module.exports = {
    entry,
    moduleOption,
    resolve,
    plugins,
    output,
};
