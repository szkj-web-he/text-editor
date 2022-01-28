import path from "node:path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const config: webpack.Configuration = {
    entry: path.resolve(__dirname, "../Src/main.ts"),

    module: {
        unsafeCache: false,
        rules: [
            {
                test: /\.(png|jpe?g|gif|pdf|eot|ttf|svg)/,
                type: "asset",
                generator: {
                    publicPath: "img/",
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 20 * 1024, // 20kb
                    },
                },
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "happypack/loader?id=ts",
                    },
                ],
            },
        ],
    },

    resolve: {
        alias: {
            "~": path.resolve(__dirname, "../Src"),
        },
        plugins: [
            new TsconfigPathsPlugin({
                configFile: "../tsconfig.json",
                logLevel: "INFO",
                extensions: [".ts", ".tsx"],
                mainFields: ["browser", "main"],
            }),
        ],
    },
};

export const plugins = [
    new HtmlWebpackPlugin({
        title: "dataReachable",
        template: path.resolve(__dirname, "../Public/index.html"),
        favicon: path.resolve(__dirname, "../Src/Assets/Images/favicon.ico"),
        meta: {
            viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
            charset: "utf-8",
            "apple-mobile-web-app-capable": "yes",
            "apple-mobile-web-app-status-bar-style": "black",
            "apple-mobile-web-app-title": "DataReachable",
            "description": "DataReachable",
            "theme-color": "#2F3BA2",
        },
    }),
    new ForkTsCheckerWebpackPlugin({
        eslint: {
            enabled: true,
            files: "./src/**/*.{ts,tsx,js,jsx}",
        },
        typescript: {
            diagnosticOptions: {
                semantic: true,
                syntactic: true,
            },
        },
    }),
];

export default config;
