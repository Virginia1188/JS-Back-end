const router = require('express').Router();
const cryptoManager = require('../managers/cryptoManager');
const {getErrorMessage} = require('../utils/errorUtils');

router.get('/create', (req, res) => {
    res.render('crypto/create');
});

router.post('/create', async (req, res) => {
    const { name, image, price, description, payment } = req.body;
    const owner = req.user._id;

    try {
        await cryptoManager.create(name, image, price, description, payment, owner);
        res.redirect('/crypto/catalog');

    } catch (error) {
        return res.status(404).render('crypto/create', { error: getErrorMessage(error) });
    }

});

router.get('/catalog', (req, res) => {
    res.render('crypto/catalog');
});

module.exports = router;