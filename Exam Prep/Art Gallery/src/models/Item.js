const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        // minLength: [2, 'Name is too Short!'],
    },
    painting: {
        type: String,
        required: [true, 'Painting technique is required!'],
        // validate: {
        //     validator: (value) => /^https?:\/\//gi.test(value),
        //     message: 'The Photo Image URL must start with http:// or https://',
        // }
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        // minLength: [1, 'Age is too short!'],
        // maxLength: [100, 'Age is to long!']
    },
    authenticity: {
        type: String,
        required: [true, 'Authenticity is required!'],
        // minLength: [5, 'Description is too short!'],
        // maxLength: [50, 'Description is to long!']
    },

    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

    shares: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    // price:{
    //     type: Number,
    //     required: [true, 'Price is required'],
    //     validate: {
    //         validator: (value) => value > 0,
    //         message: 'The price must be a positive number!',
    //     },
    // },

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

const Item = mongoose.model('Photo', itemSchema);

module.exports = Item;