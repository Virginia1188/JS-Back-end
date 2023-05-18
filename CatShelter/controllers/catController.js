const Cat = require('../models/catModel');
const qs = require('querystring');
const { readFile, catTemplate, } = require('../utils');
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

async function createAndUpdateCat(req, res,catId) {
    const urlObj = url.parse(req.url, true);
    const newCat = {
        name: urlObj.query.name,
        description: urlObj.query.description,
        image: urlObj.query.upload,
        breed: urlObj.query.breed
    };
    console.log(urlObj);
    if(catId != undefined){
        await Cat.updatedCat(newCat,catId);
    }else{
        await Cat.create(newCat);
    }
}

async function addBreed(req, res) {
    const urlObj = url.parse(req.url, true);
    const newBreed = { breedName: urlObj.query.breed };

    await Cat.breed(newBreed);
}

async function search(req, res) {
    const urlObj = url.parse(req.url, true);
    const search = urlObj.query.text;
    const homePage = await readFile('./views/home.html');

    try {
        const filteredCats = await Cat.searchCats(search);
        let result;

        if (filteredCats) {
            const catsHtml = filteredCats.map(cat => catTemplate(cat, './views/partials/cats.html')).join('');
            result = homePage.replace('{{cats}}', catsHtml);
        } else {
            result = homePage.replace('{{cats}}', `There are no cats with the name ${search}`);
        }

        res.writeHead(200, { 'content-type': 'text/html' });
        res.write(result);
        res.end();

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCats,
    getCat,
    createAndUpdateCat,
    addBreed,
    search,
};