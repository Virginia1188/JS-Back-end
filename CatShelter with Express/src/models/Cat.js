const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    breed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Breed'
    },

});

const Cat = mongoose.model('Cat', catSchema);


module.exports = Cat;