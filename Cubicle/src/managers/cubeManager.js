const cubes = [
    {
        id: '1ugewj22p8li6f6e35',
        name: 'Eco-Dark',
        description: 'Something, something',
        imageUrl: 'https://thingsidesire.com/wp-content/uploads/2018/06/Eco-Dark-Rubik%E2%80%99s-Cube2.jpg',
        difficultyLevel: 4
    }
];
const uniqId = require('uniqid');
exports.getAll = (search,from,to) => {
    let result = cubes.slice();
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
    const newCube = {
        id: uniqId(),
        ...cubeData,
    };

    cubes.push(newCube);
    return newCube;

};

exports.getOne = (cubeId) => cubes.find(x=>x.id == cubeId);

