const Cube = require('../models/Cube');

exports.getAll = async (search,from,to) => {
    
    let result = await Cube.find().lean();

    //TO DO use mongoose to filter
    if(search){
        result = result.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }
    if(from){
        result = result.filter(cube => cube.difficultyLevel >= Number(from));
    }
    if(to){
        result = result.filter(cube => cube.difficultyLevel <= Number(to));
    }
    return result;
};

exports.create = (cubeData) => {
    const cube = new Cube(cubeData);
    return cube.save();
};

exports.getOne = (cubeId) => Cube.findById(cubeId).lean();

exports.attachAccessory = async(cubeId, accessoryId) => {
    return Cube.findByIdAndUpdate(cubeId,{$push: {accessories: accessoryId}});

    // 
    // const cube = await Cube.findById(cubeId);
    // cube.accessories.push(accessoryId);
    // return cube.save();
};

