const router = require('express').Router();
const Cat = require('../models/Cat');

router.get('/add-cat', (req,res)=>{
    res.render('addCat');
});

router.post('/add-cat', async (req,res)=>{
    const {name,description, image, breed} = req.body;
    await Cat.addCat({name,description, image, breed});
    res.redirect('/');
});

router.get('/delete:catId', (req,res)=>{
    
});

router.get('/edit:catId', (req,res)=>{
    res.render('editCat');
});

module.exports = router;