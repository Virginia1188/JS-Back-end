const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    breed: String,

});


catSchema.statics.addCat = async function(catData){
    try {
        const newCat = new this(catData);
        await newCat.save();
    } catch (error) {
        console.log(error);
    }
};

const Cat = mongoose.model('Cat',catSchema);


module.exports = Cat;