const cubes = [];
const uniqId = require('uniqid');
exports.getAll = ()=> cubes.slice();

exports.create = (cubeData)=> {
    const newCube = {
        id: uniqId(),
        ...cubeData,
    };
    
    cubes.push(newCube);
    return newCube;

};

