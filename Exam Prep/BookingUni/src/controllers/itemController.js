const router = require('express').Router();
const itemManager = require('../managers/itemManager');
const { isAuth, isUserAuth } = require('../middleswares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
const { getCategory } = require('../utils/viewHelpers');
const userManager = require('../managers/userManager');



router.get('/create', isAuth, (req, res) => {
    res.render('hotel/create');
});

router.post('/create', isAuth, async (req, res) => {
    const { name, city, freeRooms, image } = req.body;
    try {
        // TODO chnage item obj

        console.log(req.body);
        const userId = req.user._id;
        const created = await itemManager.create(name, city, freeRooms, image, userId);
        await userManager.addHotel(userId, created._id);
        res.redirect('/');
    } catch (error) {
        return res.status(404).render('hotel/create', { error: getErrorMessage(error), name, city, freeRooms, image });
    }
});

router.get('/details/:itemId', isAuth, async (req, res) => {

    try {
        const item = await itemManager.getById(req.params.itemId).lean();
        // console.log(item);
        if (req.user) {
            const hasBooked = await userManager.hasBooked(req.user._id, item._id);
            console.log(hasBooked);
            item.isOwner = req.user._id == item.owner ? true : false;
            if(hasBooked){
                item.hasBooked = true;
            }
           
        }

        res.render('hotel/details', { item });

    } catch (error) {
        res.render('home', { error: 'Couldn\'t load details.', error });
    }
});

router.get('/edit/:itemId', isAuth, async (req, res) => {

    try {
        const item = await itemManager.getById(req.params.itemId).lean();

        res.render('hotel/edit', { item });
    } catch (error) {
        const item = await itemManager.getById(req.params.itemId).lean();
        res.render('hotel/details', { error: getErrorMessage(error), item });
    }

});

router.post('/edit/:itemId', isAuth, async (req, res) => {
    const { name, city, freeRooms, image } = req.body;
    const item = { name, city, freeRooms, image };
    const itemId = req.params.itemId;

    try {
        await itemManager.update(itemId, item);
        res.redirect(`/hotel/details/${itemId}`);

    } catch (error) {
        res.render('hotel/edit', { error: getErrorMessage(error), item });
    }

});

router.get('/delete/:itemId', isAuth, async (req, res) => {
    try {
        await itemManager.delete(req.params.itemId);
        res.redirect('/');
    } catch (error) {
        res.render('hotel/details', { error: 'Couldn\'t delete photo!' });
    }

});

router.get('/book/:itemId', async (req, res) => {
    const userId = req.user._id;
    const itemId = req.params.itemId;
    // add booking to hotel 
    try {
        await itemManager.addBooking(itemId, userId);
        await userManager.addBooking(userId, itemId);
        const item = await itemManager.getById(itemId).lean();

        res.render('hotel/details', {item});
    } catch (error) {
        const item = await itemManager.getById(itemId).lean();
        res.render('hotel/details', {error: error.message, item});
    }

});


module.exports = router;