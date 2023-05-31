const router = require('express').Router();
const catManager = require('../managers/catManager');
const breedManager = require('../managers/breedManager');

router.get('/', async (req, res) => {
    const cats = await catManager.findAll().lean();
    res.render('home', { cats });
});

router.get('/add-breed', (req,res)=>{
    res.render('addBreed');
});

router.post('/add-breed', async (req,res)=>{
    const {breed} = req.body;
    await breedManager.create({breed});
    res.redirect('/');
});

module.exports = router;