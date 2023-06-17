const Item = require('../models/Item');
const { getErrorMessage } = require('../utils/errorUtils');


exports.getAll = () => Item.find();
exports.getById = (itemId) => Item.findById(itemId);

exports.create = ( platform, name, image, price, genre, description , owner) =>
    Item.create({  platform, name, image, price, genre, description , owner});

exports.update = async (itemId, itemData) => {
    try {
        const updated = await Item.findByIdAndUpdate(itemId, itemData, { runValidators: true });
        return updated;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

exports.search = async (name, platform) => {
    let items = await Item.find().lean();
    if(name === '' && platform ===''){
        console.log(items);
        return items;
    }else{
        if(name){
            items = items.filter(offer => offer.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
           }
           if(platform){
            items = items.filter(offer => offer.platform.toLocaleLowerCase() == platform.toLocaleLowerCase());
           }
           return items;
    }

};

exports.delete = (itemId) => Item.findByIdAndDelete(itemId);

// exports.getByOwner = (owner) => Item.find({ owner });

exports.buy = async (itemId, userId) => {
    try {
        const item = await Item.findById(itemId);
        // console.log(item);
        item.bougthBy.push(userId);
        return item.save();
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

// exports.closeAuction = (userId, itemId) =>{
    
// };