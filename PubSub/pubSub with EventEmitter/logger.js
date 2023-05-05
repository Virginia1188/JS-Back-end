const eventEmitter = require('./eventEmitter');

const log = (data) => {

    console.log(`Logger: ${data.url}`);
};

eventEmitter.on('request', log);
