const Item = require('../models/Item');
const { getErrorMessage } = require('../utils/errorUtils');


exports.getAll = () => Item.find();
exports.getById = (itemId) => Item.findById(itemId).populate('author');

exports.create = ( title, keyword, location, date, image, description , author) =>
    Item.create({ title, keyword, location, date, image, description , author});

exports.update = async (itemId, itemData) => {
    try {
        const updated = await Item.findByIdAndUpdate(itemId, itemData, { runValidators: true });
        return updated;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

exports.delete = (itemId) => Item.findByIdAndDelete(itemId);

// exports.getByOwner = (owner) => Item.find({ owner });

exports.upVote = async (itemId, userId) => {
    try {
        const item = await Item.findById(itemId);
        item.votes.push(userId);
        item.rating += 1;        
        return item.save();
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};
exports.downVote = async (itemId, userId) => {
    try {
        const item = await Item.findById(itemId);
        item.votes.push(userId);
        item.rating -=1;        
        return item.save();
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

exports.closeAuction = (userId, itemId) =>{
    
};