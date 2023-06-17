const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [4, 'Name is too Short!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description is to short!']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required!'],
        maxLength: [2, 'Genre is to short!']
    },
    platform: {
        type: String,
        required: [true, 'Platform is required!'],
        validate: {
            validator: (value) => {
                const validValues = ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'];
                const index = validValues.findIndex(v => v.toLocaleLowerCase() === value.toLocaleLowerCase());
                if (index !== -1) {
                    return validValues[index];
                }
                return false;
            }
        },
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        validate: {
            validator: (value) => /^https?:\/\//gi.test(value),
            message: ' Image URL must start with http:// or https://',
        }
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        validate: {
            validator: (value) => value > 0,
            message: 'The price must be a positive number!',
        },
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    bougthBy: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],


});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;