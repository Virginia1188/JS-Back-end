const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip();

const readStream = fs.createReadStream('./Streams/data.txt');
const writeStream = fs.createWriteStream('./Streams/transformedData.txt');

readStream.pipe(gzip).pipe(writeStream);