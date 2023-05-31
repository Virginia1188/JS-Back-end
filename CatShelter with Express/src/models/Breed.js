const mongoose = require('mongoose');

const breedSchema = new mongoose.Schema({
    name: String,
});

const Breed = mongoose.model('Cat',breedSchema);


module.exports = Breed;