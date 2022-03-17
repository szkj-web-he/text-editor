const { entry, plugins, moduleOption, resolve, output } = require('./common');
const exclude = require('./exclude');
const rootPath = require('./rootPath');
const path = require('path');

/**
 
 type ConfigProps = webpack.Configuration & {
    devServer: webpackDevServer.Configuration;
};

*/

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
    devtool: 'eval-cheap-source-map',
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
        memoryCacheUnaffected: true,
        store: 'pack',
        buildDependencies: {
            // This makes all dependencies of this file - build dependencies
            config: [__filename],
            // 默认情况下 webpack 与 loader 是构建依赖。
        },
    },
    experiments: { cacheUnaffected: true },

    snapshot: {
        managedPaths: [],
    },

    module: moduleOption,
    devServer: {
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
        static: {
            directory: path.join(rootPath, './public'),
        },
        watchFiles: [
            path.join(rootPath, '/node_modules/', '@datareachable'),
            path.join(rootPath, '/node_modules/', '@possie-engine'),
        ],
    },
};

module.exports = config;
