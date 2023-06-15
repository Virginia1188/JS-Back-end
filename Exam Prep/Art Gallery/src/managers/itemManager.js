const Item = require('../models/Item');
const { getErrorMessage } = require('../utils/errorUtils');


exports.getAll = () => Item.find();
exports.getById = (itemId) => Item.findById(itemId).populate('author');

exports.create = (title, painting, image, authenticity, author) =>
    Item.create({ title, painting, image, authenticity, author });

exports.update = async (itemId, itemData) => {
    try {
        const updated = await Item.findByIdAndUpdate(itemId, itemData, { runValidators: true });
        return updated;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

exports.delete = (itemId) => Item.findByIdAndDelete(itemId);

exports.getShared = async (itemId, userId) =>{
        const item = await Item.findOne( {_id: itemId, shares: {$in: [userId]}});
       console.log(item);
};

exports.addUserShare = async (userId, itemId) =>{
    try {
        const item = await Item.findById(itemId);
        item.shares.push(userId);
        return item.save();
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

// exports.addComment = async (itemId, commentData) => {
    // try {
    //     const photo = await Item.findById(itemId);
    //     photo.comments.push(commentData);
    //     return photo.save();
    // } catch (error) {
    //     throw new Error(getErrorMessage(error));
    // }
// };