const router = require('express').Router();
const itemManager = require('../managers/itemManager');

router.get('/', async (req,res)=>{
    const allItems = await itemManager.getAll().lean();
    res.render('home', {allItems});
});

router.get('/404', (req,res)=>{
    res.render('404');
});

module.exports = router;