const http = require('http');
const cats = require('./cats.json');
const path = require('path');

const {getCats, getCat, createCat} = require('./controllers/catController');
const {readFile, catTemplate} = require('./utils');


const server = http.createServer(async (req, res) => {

    // console.log(req.url);

    if (req.url == '/' && req.method === 'GET') {
  
        await getCats(req,res);
      
    } else if (req.url.includes('site.css')) {

        res.writeHead(200, {
            'content-type': 'text/css',
        });
        const siteCss = await readFile('./content/styles/site.css');
        res.write(siteCss);
    } else if (/cats\/\d+\/edit/.test(req.url) && req.method === 'GET') {
        let catId = req.url.split('/')[2];
        await getCat(req,res,catId);
        // let catId = req.url.split('/')[2];
        // let cat = cats.find(x => x.id == catId);

    }else if(req.url == '/add-cat/' && req.method === 'GET'){
        createCat(req,res);
    } else if (/cats\/\d+\/shelter/.test(req.url)) {

        let catId = req.url.split('/')[2];
        let cat = cats.find(x => x.id == catId);

        const shelterCat = await readFile('./views/catShelter.html');
        res.write(shelterCat);
    } else if(req.url == '/add-breed'){
        const addBreed = await readFile('./views/addBreed.html');
        res.write(addBreed);
    } else if(req.url == '/add-cat'){
        const addCat = await readFile('./views/addCat.html');
        res.write(addCat);
    }else {

        res.write('<h1>404</h1>');
    }

    res.end();
});


server.listen(5000);
console.log('Server is listening on port 5000...');