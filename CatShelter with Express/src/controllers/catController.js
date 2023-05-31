const router = require('express').Router();
const Cat = require('../models/Cat');

router.get('/add-cat', (req, res) => {
    res.render('addCat');
});

router.post('/add-cat', async (req, res) => {
    const { name, description, image, breed } = req.body;
    await Cat.addCat({ name, description, image, breed });
    res.redirect('/');
});

router.get('/delete/:catId', (req, res) => {

});

router.get('/edit/:catId', async (req, res) => {
    const catId = req.params.catId;
    const cat = await Cat.findById(catId).lean();
    res.render('editCat', { cat });
});

router.post('/edit/:catId', async (req, res) => {
    const { name, description, image, breed } = req.body;
    const catId = req.params.catId;
    console.log(req.body);
    // await Cat.updateCat(catId, { name, description, image, breed });
    console.log(name, description, image, breed);
    const updated = await Cat.findByIdAndUpdate(
        catId,
        {
            name: name,
            description: description,
            image: image,
            breed: breed
        },
        { new: true },
    );


    res.redirect('/');
});
module.exports = router;