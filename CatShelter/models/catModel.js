const cats = require('../cats.json');
const utils = require('../utils');
const breeds = require('../breed.json');

function findAll(){
    return new Promise((resolve,reject)=>{
        resolve(cats);
    });
}

function findById(id){
    return new Promise((resolve,reject)=>{
        const cat = cats.find((c) => c.id == id);
        console.log(cat);
        resolve(cat);
    });
}

function create(cat){
    return new Promise((resolve,reject)=>{
        
        const newCat = {id: createId() , ...cat};
        cats.push(newCat);
        utils.writeDataToFile('./cats.json', cats);
        resolve(newCat);
    });
}

async function deleteCat(filename,catId){
    
    new Promise((resolve,reject)=>{
        const updated =  utils.deleteData(filename, catId);
        return resolve(updated);
    });

}

async function breed(newBreed){
    return new Promise((resolve,reject)=>{
        breeds.push(newBreed);
        utils.writeDataToFile('./breed.json',breeds);
        resolve(newBreed);
    });
    
}

async function updateBreed(html){
    const breedHtml = await utils.readFile('./views/partials/breed.html');
    const breedsTemp = breeds.map(breed => breedHtml.replaceAll('{{breedName}}',breed.breedName));
    const result = html.replace('{breed}',breedsTemp);
    return result;
}
function createId (){
    return cats.length + 1;
}

module.exports = {
    findAll,
    findById,
    create,
    deleteCat,
    breed,
    updateBreed,
};