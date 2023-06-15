const router = require('express').Router();
const itemManager = require('../managers/itemManager');
const { isAuth } = require('../middleswares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
const {getCategory} = require('../utils/viewHelpers');

// TODO change endpoints
router.get('/catalog', async (req, res) => {
    try {
        const allItems = await itemManager.getAll().lean();
       
        if(allItems.length != 0){
            allItems.isItem = true;
        }
        res.render('auctions/browse', { allItems});
    } catch (error) {
        res.render('auctions/browse', { error: 'Couldn\'t find photos.' });
    }

});

router.get('/create', isAuth, (req, res) => {
    res.render('auctions/create');
});

router.post('/create', isAuth, async (req, res) => {
    const { title, description, category, image, price } = req.body;
    try {
        // TODO chnage item obj
        
        console.log(req.body);
        const userId = req.user._id;
        const created = await itemManager.create( title, description, category, image, price , userId);

        res.redirect('/auction/catalog');
    } catch (error) {
        return res.status(404).render('auctions/create', { error: getErrorMessage(error),  title, description, category, image, price });
    }
});

router.get('/details/:itemId', async (req, res) => {

    try {
        const item = await itemManager.getById(req.params.itemId).populate('author').lean();
        console.log(item);
        // if (req.user) {
        //     item.isOwner = req.user._id == item.owner._id;
        //     item.user = true;
        // }
        res.render('auctions/details', { item });

    } catch (error) {
        res.render('auctions/browse', { error: 'Couldn\'t load details.' });
    }
});

router.get('/edit/:photoId', isAuth, async (req, res) => {

    try {
        const item = await itemManager.getById(req.params.itemId).lean();
        const options = getCategory(item.category);
        res.render('auctions/edit', { item, options });
    } catch (error) {
        res.render('auctions/details', { error: getErrorMessage(error) });
    }

});

// router.post('/edit/:photoId', isAuth, async (req, res) => {
//     const itemData = req.body;
//     const itemId = req.params.itemId;

//     try {
//         await itemManager.update(itemId, itemData);
//         res.redirect(`/photos/details/${itemId}`);

//     } catch (error) {
//         res.render('photos/edit', { error: getErrorMessage(error), itemData: itemData });
//     }

// });

// router.get('/delete/:photoId', isAuth, async (req, res) => {
//     try {
//         await itemManager.delete(req.params.itemId);
//         res.redirect('/photos/catalog');
//     } catch (error) {
//         res.render('photos/details', { error: 'Couldn\'t delete photo!' });
//     }

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