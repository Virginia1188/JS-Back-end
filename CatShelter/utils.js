
const fss = require('fs');
const fs = require('fs/promises');
const cats = require('./cats.json');

function readFile(path) {
    return fs.readFile(path, { encoding: 'utf-8' });
}

function catTemplate(cat, templatePath) {
    const html = fss.readFileSync(templatePath, { encoding: 'utf-8' });

    const modified = Object.keys(cat).reduce((result, key) => {
        return result.replaceAll(`{{${key}}}`, cat[key]);
    }, html);

    return modified;
}

function writeDataToFile(filename, content) {
    fss.writeFileSync(filename, JSON.stringify(content), 'utf-8', (err) => {
        if (err) {
            console.log(err);
        }
    });
}



module.exports = {
    readFile,
    catTemplate,
    writeDataToFile,

};
