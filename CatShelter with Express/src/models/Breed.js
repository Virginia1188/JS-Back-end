const mongoose = require('mongoose');

const breedSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    breed: String,

});

const Breed = mongoose.model('Cat',breedSchema);


module.exports = Breed;