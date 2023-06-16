const router = require('express').Router();
const itemManager = require('../managers/itemManager');

router.get('/', async (req, res) => {
    try {
        const allItems = await itemManager.getAll().lean();
        
        if (allItems.length === 0) {
            allItems.isItem = true;
        }
        res.render('home', { allItems });
    } catch (error) {
        res.render('home', { error: 'Couldn\'t find hotels.' });
    }
});

router.get('/404', (req,res)=>{
    res.render('404');
});

module.exports = router;