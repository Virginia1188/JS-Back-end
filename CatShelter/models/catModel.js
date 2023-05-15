const cats = require('../cats.json');
const utils = require('../utils');

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
        // const cat = cats.find((c) => c.id == id);
        // console.log(cat);
        // resolve(cat);

        const newCat = {id: createId() , ...cat};
        cats.push(newCat);
        utils.writeDataToFile('./cats.json', cats);
        resolve(newCat);
    });
}

function createId (){
    return cats.length + 1;
}

module.exports = {
    findAll,
    findById,
    create,
};