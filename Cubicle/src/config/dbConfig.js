const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/cubicle';

async function dbConnect(){
    await mongoose.connect(url);
};
const SECRET = 'SOMESECRET';

module.exports = {
    dbConnect,
    SECRET,
};