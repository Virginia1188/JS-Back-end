const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');

router.get('/create', (req, res) => {
    console.log(cubeManager.getAll());
    res.render('create');
});

router.post('/create', (req, res) => {
    const { name, description, imageUrl,difficultyLevel } = req.body;
    //add validation
    cubeManager.create({ 
        name, 
        description, 
        imageUrl, 
        difficultyLevel:Number(difficultyLevel),
    });
    res.redirect('/');
});

router.get('/:cubeId/details',(req,res)=>{
    const cube = cubeManager.getOne(req.params.cubeId);
    res.render('details',{...cube});
});

module.exports = router;
