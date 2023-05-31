const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    breed: String,

});

catSchema.statics.findAll = async function(){
    try {
        const cats = await Cat.find().lean();
        return cats;
    } catch (error) {
        console.log(error);
    }
};


catSchema.statics.addCat = async function(catData){
    try {
        const newCat = new this(catData);
        await newCat.save();
    } catch (error) {
        console.log(error);
    }
};

catSchema.statics.updateCat = async function(catId, catData){
    try {
        const updatedCat = await Cat.findByIdAndUpdate(
            catId,
            catData,
            {new: true}
        );
    } catch (error) {
        console.log(error);
    }
};

// catSchema.statics.deleteCat = async function(){

// };

const Cat = mongoose.model('Cat',catSchema);


module.exports = Cat;