const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const rootPath = path.join(process.cwd(), './package.json');
const prettierOption = require('../.prettierrc.js');

const addLibCommand = () => {
    fs.readFile(rootPath, function (err, data) {
        if (err) {
            return;
        }

        const jsonData = JSON.parse(data.toString());
        if (!jsonData.scripts.lib) {
            jsonData.scripts = Object.assign({}, jsonData.scripts, {
                lib: 'datareachable lib',
            });
        }

        fs.writeFile(
            rootPath,
            prettier.format(
                JSON.stringify(jsonData),
                Object.assign({}, prettierOption, { filepath: rootPath }),
            ),
            (err) => {
                if (err) {
                    return;
                }
            },
        );
    });
};

module.exports = addLibCommand;
