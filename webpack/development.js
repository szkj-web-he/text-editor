const { entry, plugins, moduleOption, resolve, output } = require('./common');
const exclude = require('./exclude');
const rootPath = require('./rootPath');
const path = require('path');

/**
 
 type ConfigProps = webpack.Configuration & {
    devServer: webpackDevServer.Configuration;
};

*/

const rules = moduleOption.rules;

moduleOption.rules = [
    ...rules,
    {
        test: /\.(sa|sc|c)ss$/,
        exclude,
        enforce: 'pre',
        use: [
            {
                loader: 'style-loader',
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
            },

            {
                loader: 'source-map-loader',
            },
        ],
    },
];

const config = {
    entry,
    resolve,
    plugins: [...plugins],
    output: {
        ...output,
        ...{
            chunkFilename: 'js/[name].js',
            filename: 'js/[name].js',
        },
    },
    watchOptions: {
        ignored: exclude,
    },
    mode: 'development',
    // eval-source-map
    devtool: 'eval-cheap-module-source-map',
    optimization: {
        runtimeChunk: true,
        minimize: false,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },
    cache: {
        type: 'filesystem',
        allowCollectingMemory: true,
        compression: 'gzip',
        memoryCacheUnaffected: true,
        store: 'pack',
    },
    experiments: { cacheUnaffected: true },
    snapshot: {
        managedPaths: [],
    },

    module: moduleOption,
    devServer: {
        contentBase: path.join(rootPath, './dist'),
        compress: true,
        host: '0.0.0.0',
        port: 'auto',
        historyApiFallback: true,
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
        watchFiles: [
            path.join(rootPath, '/node_modules/', '@datareachable'),
            path.join(rootPath, '/node_modules/', '@possie-engine'),
        ],
    },
};

module.exports = config;
