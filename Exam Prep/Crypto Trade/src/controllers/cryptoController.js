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

    try {
        const offer = await cryptoManager.findById(req.params.cryptoId).lean();

        if(!req.user){
            return res.render('crypto/details', {offer});
        }
        offer.isOwner = req.user._id == offer.owner._id;
        offer.hasBought = await cryptoManager.hasBought(offer._id,req.user._id);
        console.log(offer.hasBought);
    
        res.render('crypto/details', {offer});

    } catch (error) {
        console.log(error);
        res.render('404');
        // TODO error handling
    }

});

router.get('/buy/:cryptoId', async (req,res)=>{
    const offer = await cryptoManager.findById(req.params.cryptoId).lean();
    const userId = req.user._id;
    const bougth = await cryptoManager.buyCrypto(offer, userId);
    res.redirect(`/crypto/details/${offer._id}`);
});



module.exports = router;