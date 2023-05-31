const Breed = require('../models/Breed');

exports.create = (breedData) => {
    const breed = new Breed(breedData);
    return breed.save();
};

exports.findAll = () => {
    return Breed.find();  
};