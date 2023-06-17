const router = require('express').Router();
const itemManager = require('../managers/itemManager');

router.get('/', (req,res)=>{
    res.render('home');
});
router.get('/search', (req,res)=>{
    res.render('search');
});

router.post('/search',async (req,res)=>{
    const {name,platform} = req.body;
    console.log(name,platform);
    try {
        const items = await itemManager.search(name,platform);
        let match;
        if(items.length != 0){
            match = true;
        }
        res.render('search', {items, match});
    } catch (error) {
        
    }
});

router.get('/404', (req,res)=>{
    res.render('404');
});

module.exports = router;