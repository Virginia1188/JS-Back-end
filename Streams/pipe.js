const fs = require('fs');

const readStream = fs.createReadStream('./Streams/data.txt');
const writeStream = fs.createWriteStream('./Streams/dataPipeCopy.txt');

readStream.pipe(writeStream);