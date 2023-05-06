const fs = require('fs');

const writeStream = fs.createWriteStream('./Streams/output.txt', {encoding: 'utf-8', flags: 'a'});

const chunk1 = 'one1';
const chunk2 = 'two1';
const chunk3 = 'three1';

writeStream.write(chunk1 + '\n');
writeStream.write(chunk2 + '\n');
writeStream.write(chunk3 + '\n');

writeStream.on('close', ()=>{
    console.log('Stream closed');
});

writeStream.end();