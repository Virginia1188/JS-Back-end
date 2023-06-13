const router = require('express').Router();
const cryptoManager = require('../managers/cryptoManager');
const { isAuth } = require('../middleswares/authMiddleware');
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

router.get('/catalog', async (req, res) => {
    try {
        const offers = await cryptoManager.getAllOffers().lean();
        let isOffer = true;
        if(offers.length === 0){
            isOffer = false;
        }

        res.render('crypto/catalog', {offers,isOffer});

    } catch (error) {
        res.render('crypto/catalog', {error});
    }

});

router.get('/details/:cryptoId', async (req,res)=>{
    console.log(req.params.cryptoId);

    const offer = await cryptoManager.findById(req.params.cryptoId).lean();

    if(!req.user){
        return res.render('crypto/details', {offer});
    }

    const userStatus = {
        user: req.user._id ? true: false,
        isOwner: offer.owner?.toString() == req.user._id? true: false,
        hasBought: offer.buyers.includes(req.user._id) ? true : false,
    };

    res.render('crypto/details', {offer, userStatus});
});

module.exports = router;