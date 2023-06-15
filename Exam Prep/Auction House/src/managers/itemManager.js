const Item = require('../models/Item');
const { getErrorMessage } = require('../utils/errorUtils');


exports.getAll = () => Item.find();
exports.getById = (itemId) => Item.findById(itemId).populate('author');

exports.create = ( title, description, category, image, price , author) =>
    Item.create({  title, description, category, image, price , author});

exports.update = async (itemId, itemData) => {
    try {
        const updated = await Item.findByIdAndUpdate(itemId, itemData, { runValidators: true });
        return updated;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

exports.delete = (itemId) => Item.findByIdAndDelete(itemId);

exports.getByOwner = (owner) => Item.find({ owner });

exports.addComment = async (itemId, commentData) => {
    try {
        const photo = await Item.findById(itemId);
        photo.comments.push(commentData);
        return photo.save();
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};