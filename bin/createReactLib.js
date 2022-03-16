const fs = require('fs');
const prettier = require('prettier');
const path = require('path');

const rootPath = path.join(process.cwd(), './package.json');

const prettierOption = require('../.prettierrc.js');

const defaultData = {
    dependencies: {
        '@redux-devtools/extension': '^3.2.1',
        '@types/react': '^17.0.39',
        '@types/react-dom': '^17.0.11',
        '@types/react-redux': '^7.1.22',
        '@types/react-router-dom': '^5.3.3',
        react: '^17.0.2',
        'react-dom': '^17.0.2',
        'react-redux': '^7.2.6',
        'react-router-dom': '^6.2.1',
        redux: '^4.1.2',
        'redux-saga': '^1.1.3',
    },
};

const writeFile = (data) => {
    fs.writeFile(
        rootPath,
        prettier.format(
            data ? JSON.stringify(data) : JSON.stringify(defaultData),
            Object.assign({}, prettierOption, { filepath: rootPath }),
        ),
        (err) => {
            if (err) {
                console.log(data ? '修改失败' : '创建失败');
                return;
            }
            console.log(data ? '修改成功' : '创建成功');
        },
    );
};

const getPackage = () => {
    fs.readFile(rootPath, function (err, data) {
        if (err) {
            writeFile();
            return;
        }

        const jsonData = JSON.parse(data.toString());
        jsonData.dependencies = Object.assign({}, jsonData.dependencies, defaultData.dependencies);

        writeFile(jsonData);
    });
};

module.exports = getPackage;
