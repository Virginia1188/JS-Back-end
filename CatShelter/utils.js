
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
    // console.log(content);
    fss.writeFileSync(filename, JSON.stringify(content), 'utf-8', (err) => {
        if (err) {
            console.log(err);
        }
    });
}

async function deleteData(filename, id) {
    const catsJson = await readFile(filename);
 
    const jsonArr = JSON.parse(catsJson);
    const index = jsonArr.findIndex(obj => obj.id == id);
   
    jsonArr.splice(index, 1);
    writeDataToFile(filename, jsonArr);
    // });
}



module.exports = {
    readFile,
    catTemplate,
    writeDataToFile,
    deleteData,

};

// [
//     {
//         "id": 1,
//         "name": "1",
//         "breed": "Bombay Cat",
//         "image": "https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg",
//         "description": "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho."
//     },
//     {
//         "id": 2,
//         "name": "2",
//         "breed": "Bombay Cat",
//         "image": "https://cdn.pixabay.com/photo/2015/06/19/14/20/cat-814952_1280.jpg",
//         "description": "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho."
//     },
//     {
//         "id": 3,
//         "name": "3",
//         "breed": "Bombay Cat",
//         "image": "https://cdn.pixabay.com/photo/2018/08/08/05/12/cat-3591348_1280.jpg",
//         "description": "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho."
//     },
//     {
//         "id": 4,
//         "name": "4",
//         "breed": "Bombay Cat",
//         "image": "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg",
//         "description": "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho."
//     }
// ]