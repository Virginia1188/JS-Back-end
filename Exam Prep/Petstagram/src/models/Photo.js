const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Username is too Short!'],
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        validate: {
            validator: (value) => /^https?:\/\//gi.test(value),
            message: 'The Crypto Image URL must start with http:// or https://',
        }
    },
    age: {
        type: String,
        required: [true, 'Age is required!'],
        minLength: [1, 'Age is too short!'],
        maxLength: [100, 'Age is to long!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [5, 'Description is too short!'],
        maxLength: [50, 'Description is to long!']
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: [5, 'Location is too short!'],
        maxLength: [50, 'Location is to long!']
    },
    commentList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;