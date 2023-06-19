const Item = require('../models/Item');
const { getErrorMessage } = require('../utils/errorUtils');


exports.getAll = () => Item.find();
exports.getById = (itemId) => Item.findById(itemId);

exports.create = (name, years, kind, image, need, location, description, owner) =>
    Item.create({ name, years, kind, image, need, location, description, owner });

exports.update = async (itemId, itemData) => {
    try {
        const updated = await Item.findByIdAndUpdate(itemId, itemData, { runValidators: true });
        return updated;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

exports.delete = (itemId) => Item.findByIdAndDelete(itemId);

exports.hasDonated = (itemId, userId) => Item.findOne({ _id: itemId, donations: { $in: [userId] } });
exports.donate = async (itemId, userId) => {
    try {
        const item = await Item.findById(itemId);
        item.donations.push(userId);
        return item.save();

    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

exports.search = async (search) => {
    let items = await Item.find().lean();

    if (search) {
        items = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        items = items.sort((a, b) => a.location.localeCompare(b.location));
    }
    return items;
};