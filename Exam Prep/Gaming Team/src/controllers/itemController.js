const router = require('express').Router();
const itemManager = require('../managers/itemManager');
const { isAuth, isUserAuth } = require('../middleswares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
const { getCategory } = require('../utils/viewHelpers');

// TODO change endpoints
router.get('/catalog', async (req, res) => {
    try {
        const allItems = await itemManager.getAll().lean();

        if (allItems.length != 0) {
            allItems.isItem = true;
        }
        res.render('games/catalog', { allItems });
    } catch (error) {
        res.render('games/catalog', { error: 'Couldn\'t find games.', error });
    }

});

router.get('/create', isAuth, (req, res) => {
    res.render('games/create');
});

router.post('/create', isAuth, async (req, res) => {
    const { platform, name, image, price, genre, description } = req.body;
    try {
        // TODO chnage item obj

        console.log(req.body);
        const userId = req.user._id;
        const created = await itemManager.create(platform, name, image, price, genre, description, userId);

        res.redirect('/games/catalog');
    } catch (error) {
        return res.status(404).render('games/create', { error: getErrorMessage(error), platform, name, image, price, genre, description });
    }
});

router.get('/details/:itemId', async (req, res) => {
    
    try {
        const item = await itemManager.getById(req.params.itemId).populate('bougthBy').lean();
        console.log(item);

        if (req.user) {
            const userId = req.user._id;
            item.isUser = true;
            item.isOwner = req.user._id == item.owner._id ? true : false;
            const index = item.bougthBy.findIndex(x => x._id == userId);

            if (index == 0) {
                item.hasBougth = true;
            }

        }
        res.render('games/details', { item });
    } catch (error) {
        res.render('games/details', { error: 'Couldn\'t load details.', error });
    }
});

router.get('/edit/:itemId', isAuth, async (req, res) => {

    try {
        const item = await itemManager.getById(req.params.itemId).lean();

        const options = getCategory(item.platform);
        res.render('games/edit', { item, options });
    } catch (error) {
        const item = await itemManager.getById(req.params.itemId).lean();
        res.render('auctions/details', { error: getErrorMessage(error), item });
    }

});

router.post('/edit/:itemId', isAuth, async (req, res) => {
    const item = req.body;
    const itemId = req.params.itemId;
    const options = getCategory(item.platform);

    try {
        await itemManager.update(itemId, item);
        res.redirect(`/games/details/${itemId}`);

    } catch (error) {
        res.render('games/edit', { error: getErrorMessage(error), item, options });
    }

});

router.get('/delete/:itemId', isAuth, async (req, res) => {
    try {
        await itemManager.delete(req.params.itemId);
        res.redirect('/games/catalog');
    } catch (error) {
        res.render('games/details', { error: 'Couldn\'t delete game!' });
    }

});

router.get('/buy/:itemId', isAuth, async (req, res) => {

    const userId = req.user._id;
    const itemId = req.params.itemId;

    try {
        const bougth = await itemManager.buy(itemId, userId);
        console.log(bougth);
        res.redirect(`/games/details/${itemId}`);
    } catch (error) {
        res.render('games/details', { error: getErrorMessage(error) });
    }

});

// router.get('/close/:itemId', (req,res)=>{

//     res.redirect('auctions/closed-auctions');
// });

// router.post('/post/:photoId', async (req, res) => {
//     const user = req.user._id;
//     const { comment } = req.body;
//     const itemId = req.params.itemId;
//     console.log({user, comment});

//     try {
//         await itemManager.addComment(itemId, { user, comment });
//         res.redirect(`/photos/details/${itemId}`);
//     } catch (error) {
//         res.render('photos/details', { error: getErrorMessage(error) });
//     }

// });

module.exports = router;