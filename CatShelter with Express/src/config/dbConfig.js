const mongoose = require('mongoose');

async function connectDB(){
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect('mongodb://127.0.0.1:27017/catShelter');
        console.log('DB Connected');
    } catch (error) {
            console.log('DB connection error', error);
    }

}

module.exports = connectDB;