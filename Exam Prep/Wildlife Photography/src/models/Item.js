const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [6, 'Title is too short!'],
    },
    keyword: {
        type: String,
        required: [true, 'Keyword is required!'],
        minLength: [6, 'Keyword is too short!'],
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: [15, 'Location is too short!'],
    },
    date: {
        type: String,
        required: [true, 'Date is required!'],
        minLength: [10, 'Date is too short!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        mixLength: [8, 'Description is to short!']
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        validate: {
            validator: (value) => /^https?:\/\//gi.test(value),
            message: ' Image URL must start with http:// or https://',
        }
    },

    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    votes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    rating: {
        type: Number,
        default: 0,
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;