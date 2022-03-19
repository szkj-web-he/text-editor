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
    app: ['./src/index.tsx'],
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
};

const plugins = [
    new HtmlWebpackPlugin({
        title: 'dataReachable',
        template: path.join(rootPath, './public/index.html'),
        favicon: path.join(__dirname, '../public/favicon.ico'),
        meta: {
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'black',
            'apple-mobile-web-app-title': 'DataReachable',
            description: 'DataReachable',
            'theme-color': '#2F3BA2',
        },
        templateParameters: {
            'loading': `<style>
                * {
                    margin: 0;
                    padding: 0;
                }
                .loadingWrapper {
                    height: 100vh;
                    display: flex;
                    align-items: center;
                }

                .loadingFormCol {
                    width: 100%;
                }

                .loadingPageWrapper {
                    margin: auto;
                    width: 90%;
                    text-align: center;
                }

                .loadingPageTitle {
                    font: normal normal normal 50px poppins-semibold, poppins, sans-serif;
                    letter-spacing: 1rem;
                    margin-top: 0.5rem;
                    color: #fd6b0b;
                    font-size: 42px;
                    @media screen and (max-width: 767px) {
                        font-size: 19px;
                    }
                }

                .loadingAnimation {
                    font-family: Helvatica, lato, sans-serif;
                    font-size: 14px;
                    margin: auto;
                    font-weight: bold;
                    margin-top: 3rem;
                }

                .cubeGrid {
                    width: 40px;
                    height: 40px;
                    margin: 10px auto;
                }

                .loadingCube {
                    width: 33%;
                    height: 33%;
                    background-color: #fd6b0b;
                    float: left;
                    -webkit-animation: loadingCubeGridScaleDelay 1.3s infinite ease-in-out;
                    animation: loadingCubeGridScaleDelay 1.3s infinite ease-in-out;
                }

                .loadingCube1 {
                    -webkit-animation-delay: 0.2s;
                    animation-delay: 0.2s;
                }

                .loadingCube2 {
                    -webkit-animation-delay: 0.3s;
                    animation-delay: 0.3s;
                }

                .loadingCube3 {
                    -webkit-animation-delay: 0.4s;
                    animation-delay: 0.4s;
                }

                .loadingCube4 {
                    -webkit-animation-delay: 0.1s;
                    animation-delay: 0.1s;
                }

                .loadingCube5 {
                    -webkit-animation-delay: 0.2s;
                    animation-delay: 0.2s;
                }

                .loadingCube6 {
                    -webkit-animation-delay: 0.3s;
                    animation-delay: 0.3s;
                }

                .loadingCube7 {
                    -webkit-animation-delay: 0s;
                    animation-delay: 0s;
                }

                .loadingCube8 {
                    -webkit-animation-delay: 0.1s;
                    animation-delay: 0.1s;
                }

                .loadingCube9 {
                    -webkit-animation-delay: 0.2s;
                    animation-delay: 0.2s;
                }

                @-webkit-keyframes loadingCubeGridScaleDelay {
                    0%,
                    70%,
                    100% {
                        -webkit-transform: scale3D(1, 1, 1);
                        transform: scale3D(1, 1, 1);
                    }
                    35% {
                        -webkit-transform: scale3D(0, 0, 1);
                        transform: scale3D(0, 0, 1);
                    }
                }

                @keyframes loadingCubeGridScaleDelay {
                    0%,
                    70%,
                    100% {
                        -webkit-transform: scale3D(1, 1, 1);
                        transform: scale3D(1, 1, 1);
                    }
                    35% {
                        -webkit-transform: scale3D(0, 0, 1);
                        transform: scale3D(0, 0, 1);
                    }
                }
            </style>
            <div class="loadingWrapper">
                <div class="loadingFormCol">
                    <div class="loadingPageWrapper">
                        <div class="loadingPageTitle">DataReachable</div>
                        <div class="loadingAnimation">
                            <div class="cubeGrid">
                                <div class="loadingCube1 loadingCube"></div>
                                <div class="loadingCube2 loadingCube"></div>
                                <div class="loadingCube3 loadingCube"></div>
                                <div class="loadingCube4 loadingCube"></div>
                                <div class="loadingCube5 loadingCube"></div>
                                <div class="loadingCube6 loadingCube"></div>
                                <div class="loadingCube7 loadingCube"></div>
                                <div class="loadingCube8 loadingCube"></div>
                                <div class="loadingCube9 loadingCube"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
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
    charset: true,
};

module.exports = {
    entry,
    moduleOption,
    resolve,
    plugins,
    output,
};
