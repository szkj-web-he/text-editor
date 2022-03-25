/**
 * 加载babel的默认配置
 * 当出现自定义的babel配置文件时 取消默认配置
 */
const fs = require("fs");
const path = require("path");
const rootPath = require("./rootPath");
const command = require("./command");
const rootDirList = fs.readdirSync(rootPath);
/**
 * 找自定义的配置文件
 */
const configFile = rootDirList.find((item) =>
    [
        "babel.config.json",
        ".babelrc.json",
        "babel.config.js",
        ".babelrc.js",
        ".babelrc.mjs",
        "babel.config.mjs",
    ].includes(item),
);

const plugins = [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-throw-expressions",
    "@babel/plugin-transform-react-constant-elements",
];

const BabelConfig = configFile
    ? {
          configFile: path.join(rootPath, "/", configFile),
          cacheDirectory: command.isDev,
      }
    : {
          targets: "> 0.25%",
          presets: [
              [
                  "@babel/preset-env",
                  {
                      useBuiltIns: "entry",
                      targets: {
                          node: "current",
                      },
                      corejs: {
                          version: "3.20",
                          proposals: true,
                      },
                      browserslistEnv: "> 0.1%",
                  },
              ],

              [
                  "@babel/preset-react",
                  {
                      runtime: "automatic",
                  },
              ],
              "@babel/preset-typescript",
          ],
          plugins,
          cacheDirectory: command.isDev,
          cacheCompression: false,
      };

module.exports = BabelConfig;
