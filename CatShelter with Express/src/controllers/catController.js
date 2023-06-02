const router = require('express').Router();
const catManager = require('../managers/catManager');
const breedManager = require('../managers/breedManager');

router.get('/add-cat', async (req, res) => {
    const breeds = await breedManager.findAll().lean();
    console.log(breeds);
    res.render('addCat',{breeds});
});

router.post('/add-cat', async (req, res) => {
    const { name, description, image, breed } = req.body;
    console.log({ name, description, image, breed });
    await catManager.addCat({ name, description, image, breed });
    res.redirect('/');
});

router.get('/delete/:catId', async (req, res) => {
    const catId = req.params.catId;
    const cat = await catManager.findOneById(catId).lean();
    res.render('catShelter', { cat });
});

router.post('/delete/:catId', async (req, res) => {
    const catId = req.params.catId;
    console.log(catId);
    await catManager.deleteCat(catId);
    res.redirect('/');
});

router.get('/edit/:catId', async (req, res) => {
    const catId = req.params.catId;
    const cat = await catManager.findOneById(catId).lean();
    const breeds = await breedManager.findAll().lean();

    res.render('editCat', { cat, breeds });
});

router.post('/edit/:catId', async (req, res) => {
    const { name, description, image, breed } = req.body;
    const catId = req.params.catId;
    await catManager.updatedCat(catId, { name, description, image, breed });

    res.redirect('/');
});
module.exports = router;