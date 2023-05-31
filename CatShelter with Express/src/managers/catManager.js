const Cat = require('../models/Cat');

exports.addCat = (catData) => {
    const cat = new Cat(catData);
    return cat.save();
};

exports.updatedCat = async (catId, { name, description, image, breed }) => {
    await Cat.findByIdAndUpdate(
        catId,
        {
            name: name,
            description: description,
            image: image,
            breed: breed
        },
        { new: true }
    );
};

exports.findAll = () => {
    return Cat.find();  
};

exports.findOneById = (catId)=>{
    return Cat.findById(catId);
};

exports.deleteCat = (catId) =>{
    return Cat.deleteOne({_id:catId});
};