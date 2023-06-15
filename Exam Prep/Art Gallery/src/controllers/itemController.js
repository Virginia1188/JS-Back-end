const router = require('express').Router();
const itemManager = require('../managers/itemManager');
const userManager = require('../managers/userManager');
const { isAuth } = require('../middleswares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

// TODO change endpoints
router.get('/gallery', async (req, res) => {
    try {
        const allItems = await itemManager.getAll().lean();
        console.log(allItems);
        res.render('art/gallery', { allItems });
    } catch (error) {
        res.render('art/gallery', { error: 'Couldn\'t find photos.' });
    }

});

router.get('/create', isAuth, (req, res) => {
    res.render('art/create');
});

router.post('/create', isAuth, async (req, res) => {

    try {

        const { title, painting, image, authenticity } = req.body;
        const userId = req.user._id;
        const created = await itemManager.create(title, painting, image, authenticity, userId);
        await userManager.addPublication(created._id, userId);
        res.redirect('/art/gallery');
    } catch (error) {
        return res.status(404).render('art/create', { error: getErrorMessage(error) });
    }
});

router.get('/details/:itemId', async (req, res) => {

    try {
        // TODO shares
        const item = await itemManager.getById(req.params.itemId).lean();
        const userId = req.user._id;
        console.log(userId, item.author._id);
        const itemShared = await itemManager.getShared(req.params.itemId, req.user._id);
        if (req.user) {
            // console.log(hasShared);
            if (userId == item.author._id) {
                item.isOwner = true;
            }else if(itemShared){
                item.hasShared = !itemShared;
            }else{
                item.user = true;
            }
            
        }
    
        res.render('home', { item });

    } catch (error) {
        
        res.render('art/details', { error: 'Couldn\'t load details.', error });
    }


});

router.get('/edit/:itemId', isAuth, async (req, res) => {

    try {
        const item = await itemManager.getById(req.params.itemId).lean();

        res.render('art/edit', { item });
    } catch (error) {
        res.render('art/details', { error: getErrorMessage(error) });
    }

});

router.post('/edit/:itemId', isAuth, async (req, res) => {
    const itemData = req.body;
    const itemId = req.params.itemId;
    console.log(itemData);

    try {
        await itemManager.update(itemId, itemData);
        res.redirect(`/art/details/${itemId}`);

    } catch (error) {
        res.render('art/edit', { error: getErrorMessage(error), itemData: itemData });
    }

});

router.get('/delete/:itemId', isAuth, async (req, res) => {
    try {
        await itemManager.delete(req.params.itemId);
        res.redirect('/art/gallery');
    } catch (error) {
        res.render('art/details', { error: 'Couldn\'t delete publication!' });
    }

});

router.get('/share/:itemId', async (req, res) => {
    const userId = req.user._id;
    const itemId = req.params.itemId;
    console.log(userId, itemId);
    try {
        await itemManager.addUserShare(userId, itemId);
        
        res.redirect(`/art/details/${itemId}`);
    } catch (error) {
        res.render('art/details', { error: getErrorMessage(error) });
    }

});

module.exports = router;