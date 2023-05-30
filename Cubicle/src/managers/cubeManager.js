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

exports.create = async (cubeData) => {
    const cube = new Cube(cubeData);
    await cube.save();
    return cube;
};

exports.getOne = (cubeId) => Cube.findById(cubeId).lean();

