const router = require('express').Router();
const photoManager = require('../managers/photoManager');

router.get('/create', (req,res)=>{
    res.render('photos/create');
});

router.post('/create', async (req,res)=>{
    const photoData = req.body;
    await photoManager.create(photoData);
    res.redirect('/catalog');
});

module.exports = router;
