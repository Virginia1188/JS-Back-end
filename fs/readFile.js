const fs = require('fs');
const fsp = require('fs/promises');

const path = require('path');

// Sync reading from file
const text = fs.readFileSync(path.resolve(__dirname, './data.txt'), {encoding: 'utf-8'});

console.log(text);
console.log('Reading from file');

// Async reading from file
const asyncText = fs.readFile('./fs/data.txt', {encoding: 'utf-8'}, (err,data)=>{
    if(err){
        return console.log('Error');;
    }

    console.log(data);
});
console.log('Reading from file');


// Async reading with Promises
fsp.readFile('./fs/data.txt', {encoding: 'utf-8'})
    .then(result => {
        console.log(result);
    });
console.log('Reading from file'); 
