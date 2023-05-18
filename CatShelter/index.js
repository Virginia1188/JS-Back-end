const http = require('http');
const cats = require('./cats.json');
const path = require('path');
const url = require('url');

const { getCats, getCat, createAndUpdateCat, addBreed,search } = require('./controllers/catController');
const { readFile, deleteData } = require('./utils');
const { deleteCat, updateBreed } = require('./models/catModel');



const server = http.createServer(async (req, res) => {

    if (req.url == '/' && req.method === 'GET') {

        await getCats(req, res);

    } else if (req.url.includes('site.css')) {

        res.writeHead(200, { 'content-type': 'text/css',});
        const siteCss = await readFile('./content/styles/site.css');
        res.write(siteCss);

    } else if (/cats\/\d+\/edit\?\w+/.test(req.url)&& req.method === 'GET') {

        let catId = req.url.split('/')[2];
        console.log(catId);
        await createAndUpdateCat(req, res, catId);
        res.writeHead(301, { 'Location': '/' });

    }else if (/cats\/\d+\/edit/.test(req.url) && req.method === 'GET') {

        let catId = req.url.split('/')[2];
        await getCat(req, res, catId);

    } else if (/add-cat\?\w+/.test(req.url) && req.method === 'GET') {

        await createAndUpdateCat(req, res);
        res.writeHead(301, { 'Location': '/' });
        
    } else if (/cats\/\d+\/shelter/.test(req.url)) {

        let catId = req.url.split('/')[2];
        let cat = cats.find(x => x.id == catId);

        const shelterCat = await readFile('./views/catShelter.html');
        res.write(shelterCat);

    } else if (req.url == '/add-breed') {

        const addBreed = await readFile('./views/addBreed.html');
        res.write(addBreed);

    }else if (/search\?\w+/.test(req.url) && req.method === 'GET') {

       await search(req,res);

    } else if (/add-breed\?\w+/.test(req.url) && req.method === 'GET') {

        await addBreed(req,res);
        res.writeHead(301, { 'Location': '/' });

    }else if (req.url == '/add-cat' && req.method == 'GET') {

        const addCat = await readFile('./views/addCat.html');
        const result = await updateBreed(addCat);
        res.write(result);

    } else if (/delete/.test(req.url) && req.method == 'GET') { // need to make changes appear when redirected 
       
        let catId = req.url.split('/')[2];
        const promise = await deleteCat('./cats.json', catId);
        res.writeHead(301, { 'Location': '/' });

    } else {

        res.write('<h1>404</h1>');
    }

    res.end();
});


server.listen(5000);
console.log('Server is listening on port 5000...');