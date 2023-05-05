const http = require('http');
const eventEmitter = require('./eventEmitter');


const server = http.createServer((req,res)=>{
    console.log('TODO..');
    eventEmitter.emit('request',{ method: req.method, url: req.url});
    res.end();
});

server.listen(5000);
console.log('Server is listening on port 5000...');

module.exports = server;