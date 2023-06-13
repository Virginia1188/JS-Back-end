const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    image:{
        type: String,
        required: [true, 'Image is required']
    },
    price:{
        type: Number,
        required: [true, 'Price is required']
    },
    'crypto description': {
        type: String,
        required: [true, 'Description is required']
    },
    'payment method': {
        type: String,
        required: [true, 'Payment metod is required']
    },
    'buy a crypto': [{
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