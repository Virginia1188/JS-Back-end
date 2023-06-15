const Photo = require('../models/Photo');
const { getErrorMessage } = require('../utils/errorUtils');


exports.getAll = () => Photo.find().populate('owner');
exports.getById = (photoId) => Photo.findById(photoId).populate('owner');

exports.create = (name, image, age, description, location, owner) =>
    Photo.create({ name, image, age, description, location, owner });

exports.update = async (photoId, photoData) => {
    try {
        const updated = await Photo.findByIdAndUpdate(photoId, photoData, { runValidators: true });
        return updated;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};


exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);

exports.getByOwner = (owner) => Photo.find({ owner });

exports.addComment = async (photoId, commentData) => {
    try {
        const photo = await Photo.findById(photoId);
        photo.comments.push(commentData);
        return photo.save();
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};