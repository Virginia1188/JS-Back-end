const router = require('express').Router();
const cryptoManager = require('../managers/cryptoManager');
const { isAuth } = require('../middleswares/authMiddleware');
const {getErrorMessage} = require('../utils/errorUtils');
const {getPeymentOptions} = require('../utils/viewHelpers');


router.get('/create', (req, res) => {
    res.render('crypto/create');
});

router.post('/create', isAuth, async (req, res) => {
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

    try {
        const offer = await cryptoManager.findById(req.params.cryptoId).lean();
        
        if(!req.user){
            return res.render('crypto/details', {offer});
        }else{
        
            offer.isLogged = true;
            offer.isOwner = req.user._id == offer.owner._id;
            offer.hasBought = await cryptoManager.hasBought(offer._id,req.user._id);
            res.render('crypto/details', {offer});
        }

    } catch (error) {
        // console.log(error);
        res.render('404');
        // TODO error handling
    }

});

router.get('/buy/:cryptoId', isAuth, async (req,res)=>{
    try {
        const offer = await cryptoManager.findById(req.params.cryptoId).lean();
        const userId = req.user._id;
        const bougth = await cryptoManager.buyCrypto(offer, userId);
        res.redirect(`/crypto/details/${offer._id}`);
    } catch (error) {
        
    }

});

router.get('/delete/:cryptoId', isAuth, async (req,res)=>{
    try {
        await cryptoManager.deleteCrypto(req.params.cryptoId);
        res.redirect('/crypto/catalog');
    } catch (error) {
        res.render('404');
    }

});

router.get('/edit/:cryptoId', isAuth, async (req,res)=>{
    try {
        const offer = await cryptoManager.findById(req.params.cryptoId).lean();
    
        const options = getPeymentOptions(offer.payment);
        console.log(options);
        res.render('crypto/edit', {offer, options});
    } catch (error) {
        
    }
});

router.post('/edit/:cryptoId', async (req,res)=>{
    const offer = req.body;
    const cryptoId = req.params.cryptoId;
    try {

        await cryptoManager.update(cryptoId, offer);
        res.redirect(`/crypto/details/${cryptoId}`);
    } catch (error) {
        const options = getPeymentOptions(offer.payment);
        res.status(400).render('crypto/edit',{offer,options, error: getErrorMessage(error) });
    }
});

module.exports = router;