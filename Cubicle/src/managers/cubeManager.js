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
exports.getAll = () => cubes.slice();

exports.create = (cubeData) => {
    const newCube = {
        id: uniqId(),
        ...cubeData,
    };

    cubes.push(newCube);
    return newCube;

};

exports.getOne = (cubeId) => cubes.find(x=>x.id == cubeId);

