const router = require('express').Router();
const cats = require('../../cats.json');

router.get('/', (req, res) => {
    res.render('home', { cats });
});


module.exports = router;