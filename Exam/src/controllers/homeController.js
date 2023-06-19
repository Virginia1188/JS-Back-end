const router = require('express').Router();
const itemManger = require('../managers/itemManager');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/', async (req, res) => {
    try {
        const posts = await itemManger.getAll().sort({ _id: -1 }).limit(3).lean();
        res.render('home', { posts });
    } catch (error) {
        res.render('home', { error: getErrorMessage(error) });
    }

});
router.get('/search', (req, res) => {
    res.render('search');
});

router.post('/search', async (req, res) => {
    const { search } = req.body;
    try {
        const items = await itemManger.search(search);
        res.render('search', { items });
    } catch (error) {
        res.render('search', { error: getErrorMessage(error) });
    }

});

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;