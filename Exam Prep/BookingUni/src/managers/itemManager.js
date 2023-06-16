const Item = require('../models/Item');
const { getErrorMessage } = require('../utils/errorUtils');


exports.getAll = () => Item.find().sort({freeRooms: -1});
exports.getById = (itemId) => Item.findById(itemId);

exports.create = ( name, city, freeRooms, image , owner) =>
    Item.create({  name, city, freeRooms, image , owner});

exports.update = async (itemId, item) => {
    try {
        const updated = await Item.findByIdAndUpdate(itemId, item, { runValidators: true });
        return updated;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

exports.delete = (itemId) => Item.findByIdAndDelete(itemId);

// exports.getByOwner = (owner) => Item.find({ owner });

exports.addBooking = async (itemId, userId) => {
    try {
        const item = await Item.findById(itemId);
        item.freeRooms --;
        item.usersBooking.push(userId);        
        return item.save();
        
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

exports.closeAuction = (userId, itemId) =>{
    
};