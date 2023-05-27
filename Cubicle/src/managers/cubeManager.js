const cubes = [];

exports.getAll = ()=> cubes.slice();

exports.create = (cubeData)=> {
    const newCube = {
        id: cubes.length +1,
        ...cubeData,
    };
    // console.log(newCube);
    cubes.push(newCube);
    return newCube;

};