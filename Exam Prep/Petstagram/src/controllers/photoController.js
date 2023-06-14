const router = require('express').Router();
const photoManager = require('../managers/photoManager');
const userManager = require('../managers/userManager');

router.get('/catalog', async (req,res)=>{
    const allPhotos = await photoManager.getAll().lean();
    console.log(allPhotos);
    res.render('photos/catalog', {allPhotos});

});

router.get('/create', (req,res)=>{
    res.render('photos/create');
});

router.post('/create', async (req,res)=>{
    const {name, image, age, description, location} = req.body;
    const userId = req.user._id;
    const created = await photoManager.create(name, image, age, description, location, userId);

    res.redirect('/photos/catalog');
});

module.exports = router;
