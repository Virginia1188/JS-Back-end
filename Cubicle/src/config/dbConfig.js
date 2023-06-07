const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/cubicle';

async function dbConnect(){
    await mongoose.connect(url);
};
const SECRET = 'd61bc4ae780cc6fd2e9be6fc162bd633e7ce7c9b4250ef0f6dffc183bf02af69';

module.exports = {
    dbConnect,
    SECRET,
};