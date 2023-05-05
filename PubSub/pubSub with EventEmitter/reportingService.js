let eventEmitter = require('./eventEmitter');

const collect = (data) =>{
    console.log('Reporting service - '+ data.method);
};

eventEmitter.on('request', collect);