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

// exports.getByOwner = (owner) => Item.find({ owner });

exports.addBid = async (itemId, userId, price) => {
    try {
        const item = await Item.findById(itemId);

        if(item.price < Number(price)){
            item.bidder = userId;
            item.price = price;
        }else{
            throw new Error('Your bid should ne higher then the price!');
        }
        
        return item.save();
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};