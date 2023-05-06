const fs = require('fs');

const readStream = fs.createReadStream('./Streams/data.txt');
const writeStream = fs.createWriteStream('./Streams/dataCopyPipe.txt');

readStream.pipe(writeStream);