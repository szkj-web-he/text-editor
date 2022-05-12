const rootPath = require("../webpack/rootPath");

const fs = require("fs");
const path = require("path");

const create = () => {
    console.log("Start creating html entry files...");
    const name = "public";
    //创建public
    fs.mkdirSync(path.join(rootPath, "./", name));
    //获取有多文件
    const copyFileList = fs.readdirSync(path.join(__dirname, "../", name));
    for (let i = 0; i < copyFileList.length; i++) {
        fs.copyFileSync(
            path.join(__dirname, "../", name, "/", copyFileList[i]),
            path.join(rootPath, "./", name, "/", copyFileList[i]),
        );
    }
    console.log("End of html entry file creation!");
};

module.exports = () => {
    const list = fs.readdirSync(path.join(rootPath, "./"));

    const dirData = list.find((item) => item === "public");
    if (dirData) {
        try {
            fs.readFileSync(path.join(rootPath, "./", dirData, "index.html"));
        } catch (err) {
            create();
        }
    } else {
        create();
    }
};
