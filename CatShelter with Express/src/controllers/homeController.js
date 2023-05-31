const router = require('express').Router();
const catManager = require('../managers/catManager');

router.get('/', async (req, res) => {
    const cats = await catManager.findAll().lean();
    res.render('home', { cats });
});

router.get('/add-breed', (req,res)=>{
    res.render('addBreed');
});

module.exports = router;