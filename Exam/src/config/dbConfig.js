const mongoose = require('mongoose');

//TODO chnage database url
const url = 'mongodb://127.0.0.1:27017/friendlyWorld';

async function dbConnect(){
    await mongoose.connect(url);
}

const SECRET = '485ace65c4799bdd10be7232b372cb1ea7d7dae0';

module.exports = {
    dbConnect,
    SECRET,
};