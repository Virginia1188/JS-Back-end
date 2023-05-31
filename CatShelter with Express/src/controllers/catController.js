const router = require('express').Router();
const catManager = require('../managers/catManager');

router.get('/add-cat', (req, res) => {
    res.render('addCat');
});

router.post('/add-cat', async (req, res) => {
    const { name, description, image, breed } = req.body;
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
    res.render('editCat', { cat });
});

router.post('/edit/:catId', async (req, res) => {
    const { name, description, image, breed } = req.body;
    const catId = req.params.catId;
    await catManager.updatedCat(catId, { name, description, image, breed });

    res.redirect('/');
});
module.exports = router;