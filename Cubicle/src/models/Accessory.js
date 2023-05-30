const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
});

const Accessesory = mongoose.model('Accessory',accessorySchema);

module.exports = Accessesory;