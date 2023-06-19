const router = require('express').Router();
const itemManager = require('../managers/itemManager');
const { isAuth, isUserAuth } = require('../middleswares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/dashboard', async (req, res) => {
    try {
        const allItems = await itemManager.getAll().lean();

        if (allItems.length != 0) {
            allItems.isItem = true;
        }
        res.render('posts/dashboard', { allItems });
    } catch (error) {
        res.render('posts/dashboard', { error: 'Couldn\'t find posts.' });
    }

});

router.get('/create', isAuth, (req, res) => {
    res.render('posts/create');
});

router.post('/create', isAuth, async (req, res) => {
    const { name, years, kind, image, need, location, description } = req.body;
    try {

        console.log(req.body);
        const userId = req.user._id;
        const created = await itemManager.create(name, years, kind, image, need, location, description, userId);

        res.redirect('/posts/dashboard');
    } catch (error) {
        return res.status(404).render('posts/create', { error: getErrorMessage(error), name, years, kind, image, need, location, description });
    }
});

router.get('/details/:itemId', async (req, res) => {
    try {
        const item = await itemManager.getById(req.params.itemId).lean();

        console.log(item);
        if (req.user) {
            const userId = req.user._id;
            item.isUser = true;
            item.isOwner = userId == item.owner._id ? true : false;

            const hasDonated = await itemManager.hasDonated(item._id, userId);

            const index = item.donations.findIndex(x => x == userId);
            console.log(hasDonated);
            console.log(userId);
            if (hasDonated == null) {
                item.canDonate = true;
            }

        }

        res.render('posts/details', { item });

    } catch (error) {
        res.render('posts/details', { error: 'Couldn\'t load details.', error });
    }
});

router.get('/edit/:itemId', isAuth, async (req, res) => {

    try {
        const item = await itemManager.getById(req.params.itemId).lean();

        res.render('posts/edit', { item });
    } catch (error) {
        const item = await itemManager.getById(req.params.itemId).lean();
        res.render('posts/details', { error: getErrorMessage(error), item });
    }

});

router.post('/edit/:itemId', isAuth, async (req, res) => {
    const item = req.body;
    const itemId = req.params.itemId;

    try {
        await itemManager.update(itemId, item);
        res.redirect(`/posts/details/${itemId}`);

    } catch (error) {
        res.render('posts/edit', { error: getErrorMessage(error), item });
    }

});

router.get('/delete/:itemId', isAuth, async (req, res) => {
    try {
        await itemManager.delete(req.params.itemId);
        res.redirect('/posts/dashboard');
    } catch (error) {
        res.render('posts/details', { error: 'Couldn\'t delete post!' });
    }

});

router.get('/donate/:itemId', async (req, res) => {

    const userId = req.user._id;
    const itemId = req.params.itemId;
    try {
        await itemManager.donate(itemId, userId);
        res.redirect(`/posts/details/${itemId}`);
    } catch (error) {
        res.render('posts/details', { error: getErrorMessage(error) });
    }

});



module.exports = router;