const fs = require('fs');
const path = require('path');

// console.log(__dirname);

fs.writeFile(path.resolve(__dirname, './output.txt'), 'Something', ()=>{
    console.log('file created');
});