const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name is too short!']
    },
    image:{
        type: String,
        required: [true, 'Image is required'],
        validate: {
            validator: (value) => /^https?:\/\//gi.test(value),
            message: 'The Crypto Image URL must start with http:// or https://',
        }
    },
    price:{
        type: Number,
        required: [true, 'Price is required'],
        validate: {
            validator: (value) => value > 0,
            message: 'The price must be a positive number!',
        },
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description is too short!'],
    },
    payment: {
        type: String,
        required: [true, 'Payment metod is required'],
        validate: {
            validator: (value) => {
                const validValues = ['Crypto-Wallet', 'Credit-Card', 'Debit-Card', 'PayPal'];
                const index = validValues.findIndex(v => v.toLocaleLowerCase() === value.toLocaleLowerCase());
                if (index !== -1) {
                    return validValues[index];
                }

                return false;
            }
        },
    },
    buyers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;