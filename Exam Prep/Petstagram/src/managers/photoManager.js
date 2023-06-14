const Photo = require('../models/Photo');


exports.getAll = () => Photo.find().populate('owner');
exports.getById = (photoId)=> Photo.findById(photoId);

exports.create = (name, image, age, description, location, owner) => 
    Photo.create({name, image, age, description, location, owner});