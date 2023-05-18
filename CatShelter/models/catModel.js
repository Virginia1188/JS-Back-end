const cats = require('../cats.json');
const utils = require('../utils');
const breeds = require('../breed.json');

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(cats);
    });
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const cat = cats.find((c) => c.id == id);
        resolve(cat);
    });
}

async function create(cat) {

    return new Promise((resolve, reject) => {
        const newCat = { id: createId(), ...cat };
        cats.push(newCat);
        utils.writeDataToFile('./cats.json', cats);
        resolve(newCat);
    });
}

async function updatedCat(cat, catId) {
    const updated = await findById(catId);
    return new Promise((resolve, reject) => {
        
        console.log(updated);
        console.log(cat.name);
        updated.name = cat.name;

        updated.description = cat.description;
        updated.breed = cat.breed;
        updated.image = cat.image;
        utils.writeDataToFile('./cats.json', cats);
        resolve(updated);
    });

}

async function deleteCat(filename, catId) {
    const index = cats.findIndex(c => c.id == catId);
    cats.splice(index, 1);
    new Promise((resolve, reject) => {
        const updated = utils.writeDataToFile(filename, cats);
        return resolve(cats);
    });

}

async function breed(newBreed) {
    return new Promise((resolve, reject) => {
        breeds.push(newBreed);
        utils.writeDataToFile('./breed.json', breeds);
        resolve(newBreed);
    });

}

async function updateBreed(html) {
    const breedHtml = await utils.readFile('./views/partials/breed.html');
    const breedsTemp = breeds.map(breed => breedHtml.replaceAll('{{breedName}}', breed.breedName));
    const result = html.replace('{breed}', breedsTemp);
    return result;
}

async function searchCats(text) {
    const searchResult = cats.filter((c) => c.name.toLowerCase().includes(text.toLowerCase()));

    return new Promise((resolve, reject) => {
        resolve(searchResult);
    });
}

function createId() {
    return cats.length + 1;
}

module.exports = {
    findAll,
    findById,
    create,
    deleteCat,
    breed,
    updateBreed,
    searchCats,
    updatedCat,
};