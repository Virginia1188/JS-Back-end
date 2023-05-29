const router = require('express').Router();
const Cat = require('../models/Cat');

// const cats = require('../../cats.json');

router.get('/', async (req, res) => {
    const cats = await Cat.findAll();
    res.render('home', { cats });
});


module.exports = router;