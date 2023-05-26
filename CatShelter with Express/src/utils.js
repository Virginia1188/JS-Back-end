const fs = require('fs');
// const cats = require('./cats.json');

function readFile(path){
    return fs.readFile(path, {encoding: 'utf-8'});
}

module.exports = {
    readFile,
};