const utils = require('../utils');

async function getAllCats(req,res){
    const data = JSON.parse(utils.readFile('../cats.json'));
    const template = require('../view');
}