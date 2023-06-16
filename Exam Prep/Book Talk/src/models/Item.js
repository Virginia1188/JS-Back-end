const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [2, 'Title is too short!'],
    },
    author: {
        type: String,
        required: [true, 'Author is required!'],
        minLength: [5, 'Author is too short!'],
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        validate: {
            validator: (value) => /^https?:\/\//gi.test(value),
            message: 'The Image URL must start with http:// or https://',
        }
    },
    review: {
        type: String,
        required: [true, 'Review is required!'],
        minLength: [10, 'Review is too short!'],
    },
    genre: {
        type: String,
        required: [true, 'Genre is required!'],
        minLength: [3, 'Genre is too short!'],
    },
    stars:{
        type: Number,
        required: [true, 'Stars is required'],
        validate: {
            validator: (value) => value > 0 && value < 6,
            message: 'Stars must be between 1 and 5!',
        },
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    wishingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],

});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;