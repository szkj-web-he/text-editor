const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const rootPath = require("./rootPath");
const exclude = require("./exclude");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const command = require("./command");
const htmlPlugin = require("./htmlPlugin");
const { ProvidePlugin } = require("webpack");

// webpack.Entry
/**
 * 入口文件
 * core-js
 * regenerator-runtime/runtime
 * 做兼容处理
 */
const entry = {
    app: [path.join(__dirname, "../assets/js/index.js"), "./src/index.tsx"],
};
//  webpack.ModuleOptions
const moduleOption = {
    rules: [
        {
            test: /.ico$/,
            type: "asset/resource",
            generator: {
                filename: "/[name][ext][query]",
            },
        },
        {
            test: /.(woff2?|pdf|eot|ttf|svg|opentype|otf)$/,
            type: "asset/resource",
            generator: {
                filename: "assets/[name][ext][query]",
            },
        },
        {
            test: /.(png|jpe?g|gif)$/,
            type: "asset",
            generator: {
                filename: "assets/[name][ext][query]",
            },
            parser: {
                dataUrlCondition: {
                    maxSize: 10 * 1024, // 10kb
                },
            },
        },
        {
            test: /\.js$/,
            loader: "esbuild-loader",
            exclude,
            options: {
                charset: "utf8",
                loader: "js", // Remove this if you're not using JSX
                target: "es2015", // Syntax to compile to (see options below for possible values)
            },
        },
        {
            test: /\.jsx$/,
            loader: "esbuild-loader",
            exclude,
            options: {
                charset: "utf8",
                loader: "jsx", // Remove this if you're not using JSX
                target: "es2015", // Syntax to compile to (see options below for possible values)
            },
        },
        {
            test: /\.ts$/,
            loader: "esbuild-loader",
            exclude,
            options: {
                charset: "utf8",
                loader: "ts", // Or 'ts' if you don't need tsx
                target: "es2015",
                tsconfigRaw: require(path.join(rootPath, "./tsconfig.json")),
            },
        },
        {
            test: /\.tsx$/,
            loader: "esbuild-loader",
            exclude,
            options: {
                charset: "utf8",
                loader: "tsx", // Or 'ts' if you don't need tsx
                target: "es2015",
                tsconfigRaw: require(path.join(rootPath, "./tsconfig.json")),
            },
        },
        {
            test: /\.(sa|sc)ss$/,
            use: [
                {
                    loader: command.isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                },
                {
                    loader: "css-loader",
                    options: {
                        importLoaders: 2,
                        modules: {
                            localIdentName: "[local]",
                        },
                    },
                },
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            config: path.resolve(__dirname, "../postcss.config.js"),
                        },
                    },
                },
                {
                    loader: "sass-loader",
                },
            ],
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: command.isDev ? "style-loader" : MiniCssExtractPlugin.loader,
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
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            config: path.resolve(__dirname, "../postcss.config.js"),
                        },
                    },
                },
            ],
        },
    ],
};

// webpack.ResolveOptions
const resolve = {
    alias: {
        "~": "/src",
    },
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    mainFields: ["main", "browser", "module"],
    symlinks: false,
    cacheWithContext: false,
};

const plugins = [
    new HtmlWebpackPlugin(htmlPlugin),
    new ProvidePlugin({
        React: "react",
        ReactDOM: "react-dom",
    }),
    new ForkTsCheckerWebpackPlugin({
        issue: {
            exclude: ({ file }) => {
                return file?.includes("node_modules") || false;
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
    new webpack.ProgressPlugin({ percentBy: "entries" }),
];

const getPublicPath = () => {
    const name = path.basename(rootPath);
    return name.includes("_") ? `/${name.split("_")[1]}/` : "/";
};

const output = {
    publicPath: command.isDev ? "/" : getPublicPath(),
    clean: true,
    path: path.join(rootPath, "/build"),
    pathinfo: false,
    charset: true,
};

module.exports = {
    entry,
    moduleOption,
    resolve,
    plugins,
    output,
    experiments: {
        asyncWebAssembly: true,
        syncWebAssembly: true,
    },
};
