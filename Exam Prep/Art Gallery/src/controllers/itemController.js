const router = require('express').Router();
const itemManager = require('../managers/itemManager');
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

        res.redirect('/art/gallery');
    } catch (error) {
        return res.status(404).render('art/create', { error: getErrorMessage(error) });
    }
});

router.get('/details/:itemId', async (req, res) => {

    try {
        // TODO shares
        const item = await itemManager.getById(req.params.itemId).lean();
        // console.log(item);
        if (req.user) {
            if (req.user._id == item.author._id) {
                item.isOwner = true;
            }

            item.user = true;
        }
    
        res.render('art/details', { item });

    } catch (error) {
        console.log(error);
        res.render('art/details', { error: 'Couldn\'t load details.', error });
    }


});

// router.get('/edit/:photoId', isAuth, async (req, res) => {

//     try {
//         const item = await itemManager.getById(req.params.itemId).lean();

//         res.render('photos/edit', { item });
//     } catch (error) {
//         res.render('photos/details', { error: getErrorMessage(error) });
//     }

// });

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