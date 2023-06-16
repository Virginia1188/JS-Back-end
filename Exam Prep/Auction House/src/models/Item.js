const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [4, 'Title is too Short!'],
    },
    description: {
        type: String,
        maxLength: [200, 'Description is to long!']
    },
    category: {
        type: String,
        required: [true, 'Category is required!'],
        validate: {
            validator: (value) => {
                const validValues = ['vehicles', 'estate', 'electronics', 'furniture', 'other'];
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
    },
    price:{
        type: Number,
        required: [true, 'Price is required'],
        validate: {
            validator: (value) => value > 0,
            message: 'The price must be a positive number!',
        },
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    bidder: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },



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