const fs = require('fs');

const readStream = fs.createReadStream('./Streams/data.txt', {encoding: 'utf-8'});

readStream.on('data', (chunk)=>{
    console.log('-----New chunk-----');
    console.log(chunk);
});

readStream.on('close', ()=>{
    console.log('Stream closed');
});