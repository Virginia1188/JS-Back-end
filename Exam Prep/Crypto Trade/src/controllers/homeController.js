const router = require('express').Router();
const cryptoManager = require('../managers/cryptoManager');

router.get('/', (req,res)=>{
    res.render('home');
});

router.get('/404', (req,res)=>{
    res.render('404');
});

router.get('/search', async (req,res)=>{
    const offers = await cryptoManager.getAllOffers();
    res.render('search', {offers});
});

router.post('/search',async (req,res)=>{
    const {search,payment} = req.body;
    const offers = await cryptoManager.getAllOffers(search,payment);
    res.render('search', {offers});

});
module.exports = router;