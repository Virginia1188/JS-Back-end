const fs = require('fs');

const readStream = fs.createReadStream('./Streams/data.txt');
const writeStream = fs.createWriteStream('./Streams/dataCopy.txt');

readStream.on('data', (chunk) => {
    console.log('Write Stream');
    writeStream.write(chunk);
});

readStream.on('close', () => {
    console.log('Stream Closed');
    writeStream.end();
});