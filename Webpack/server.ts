import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";

const app = express();
import config from "./development";
const compiler = webpack(config);

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output?.publicPath,
    })
);

// 将文件 serve 到 port 3000。
app.listen(3000, function () {
    console.log("Example app listening on port 3000!\n");
});
