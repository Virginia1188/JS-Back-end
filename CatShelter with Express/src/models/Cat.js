const mongoose = require('./db');

const catSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    breed: String,

});

const Cat = mongoose.model('Cat',catSchema);

module.exports = Cat;