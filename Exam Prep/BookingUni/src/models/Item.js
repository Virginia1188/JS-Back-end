const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        unique: [true, 'Name already exists!'],
        minLength: [4, 'Title is too short!'],
    },
    city: {
        type: String,
        required: [true, 'City is required!'],
        mixLength: [3, 'City is to short!']
    },
    freeRooms: {
        type: Number,
        required: [true, 'Category is required!'],
        validate: {
            validator: (value) => value > 0 && value <= 101,
            message: 'Free rooms must be between 1 and 100!',
        },
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        validate: {
            validator: (value) => /^https?:\/\//gi.test(value),
            message: 'The Image URL must start with http:// or https://',
        }
    },

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Owner is required!']
    },
    usersBooking: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        
    }],




    // payment: {
    //     type: String,
    //     required: [true, 'Payment metod is required'],
    //     validate: {
    //         validator: (value) => {
    //             const validValues = ['Crypto-Wallet', 'Credit-Card', 'Debit-Card', 'PayPal'];
    //             const index = validValues.findIndex(v => v.toLocaleLowerCase() === value.toLocaleLowerCase());
    //             if (index !== -1) {
    //                 return validValues[index];
    //             }

    //             return false;
    //         }
    //     },
    // },

    // comments: [
    //     {
    //         user: {
    //             type: mongoose.Types.ObjectId,
    //             required: true,
    //             ref: 'User'
    //         },
    //         comment: {
    //             type: String,
    //             required: [true, 'Comment is required!']
    //         }
    //     }
    // ],
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;