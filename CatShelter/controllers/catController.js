const Cat = require('../models/catModel');
const qs = require('querystring');
const { readFile, catTemplate, deleteData } = require('../utils');
const url = require('url');


async function getCats(req, res) {
    try {

        const cats = await Cat.findAll();
        const homePage = await readFile('./views/home.html');
        const catsHtml = cats.map(cat => catTemplate(cat, './views/partials/cats.html')).join('');
        const result = homePage.replace('{{cats}}', catsHtml);
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write(result);
        res.end();
    } catch (error) {
        console.log(error);
    }
}


async function getCat(req, res, id) {
    try {
        const cat = await Cat.findById(id);
        console.log(cat);
        if (cat) {

            const editCatHtml = await readFile('./views/editCat.html');
            const result = editCatHtml.replace('{{cat}}', catTemplate(cat, './views/partials/cat.html'));
            const addBreed = await Cat.updateBreed(result);
            res.writeHead(200, { 'content-type': 'text/html' });
            res.write(addBreed);
            res.end();
        } else {
            res.writeHead(404, { 'content-type': 'text/html' });
            res.end(JSON.stringify({ message: 'Cat not found' }));
        }

    } catch (error) {
        console.log(error);
    }
}

async function createCat(req, res) {
    const urlObj = url.parse(req.url, true);
    const newCat = {
        name: urlObj.query.name,
        description: urlObj.query.description,
        image: urlObj.query.upload,
        breed: urlObj.query.breed
    };

    await Cat.create(newCat);

}

async function addBreed(req,res){
    const urlObj = url.parse(req.url, true);
    const newBreed = {breedName: urlObj.query.breed};
    console.log(urlObj);
    console.log(newBreed);

    await Cat.breed(newBreed);
}

// async function deleteAndUpdate(res, filename, catId) {
//     await Cat.deleteCat(filename, catId);

//     res.writeHead(301, { 'Location': '/' });
//     res.end();

// }

module.exports = {
    getCats,
    getCat,
    createCat,
    addBreed,
};