const Item = require('../models/Item');
const { getErrorMessage } = require('../utils/errorUtils');


exports.getAll = () => Item.find();
exports.getById = (itemId) => Item.findById(itemId).populate('author');

exports.create = ( title, author, image, review, genre, stars , owner) =>
    Item.create({  title, author, image, review, genre, stars , owner});

exports.updateWishList = async (itemId, userId) => {
    try {
        const updated = await Item.findById(itemId);
        updated.wishingList.push(userId);
        return updated.save();
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

exports.updated = async (itemId, itemData) => {
    try {
        const updated = await Item.findByIdAndUpdate(itemId, itemData, { runValidators: true });
        return updated;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

exports.delete = (itemId) => Item.findByIdAndDelete(itemId);


exports.hasWished = async (itemId, userId) => {
    try {
        const item = await Item.findById(itemId);

        if(item.wishingList.includes(userId)){
            item.isWished = true;
           
        }
        
        return item.save();
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

