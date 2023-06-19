const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name is too short!'],
    },
    years: {
        type: [Number, 'Years must be a number!'],
        required: [true, 'Years is required!'],
        validate: {
            validator: (value) => value >= 1 && value <= 100,
            message: 'Years should be between 1 and 100!',
        },
    },
    kind: {
        type: String,
        required: [true, 'Kind is required!'],
        minLength: [3, 'Kind is too short!'],
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        validate: {
            validator: (value) => /^https?:\/\//gi.test(value),
            message: ' Image URL must start with http:// or https://',
        }
    },
    need: {
        type: String,
        required: [true, 'Need is required!'],
        minLength: [3, 'Need is too short!'],
        maxLength: [20, 'Need is too long!']
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: [5, 'Locations is too short!'],
        maxLength: [15, 'Location is too long!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        maxLength: [50, 'Description is to long!'],
        minLength: [5, 'Description is too short!'],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    donations: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],

});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;