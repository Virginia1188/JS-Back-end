const Cat = require('../models/catModel');
const qs = require('querystring');
const { readFile, catTemplate, getPostData} = require('../utils');
const url = require('url');


async function getCats(req, res) {
    try {

        const cats = await Cat.findAll();
        const homePage = await readFile('./views/home.html');
        const catsHtml = cats.map(cat => catTemplate(cat)).join('');
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
            res.writeHead(200, { 'content-type': 'text/html' });
            res.write(editCatHtml);
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
        
        const name = urlObj.query.name;
        console.log(name);
        console.log(name);
    try {

        // const body = await getPostData(req);
        // console.log(body);
        // const { name, breed, image, description } = getFormData(body);
        // const cat = {
        //     name,
        //     breed,
        //     image,
        //     description,
        // };
       
        const urlObj = url.parse(req.url, true);
        
        const name = urlObj.query.name;
        console.log(name);
        console.log(name);

        // const newCat = await Cat.create(cat);
        // console.log(newCat);
        // res.writeHead(201, { 'content-type': 'application/json' });
        // console.log(JSON.stringify(newCat));
        // return res.end(JSON.stringify(newCat));


    } catch (error) {
        // console.log(error);
    }
}

module.exports = {
    getCats,
    getCat,
    createCat,
};