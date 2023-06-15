const router = require('express').Router();
const itemManager = require('../managers/photoManager');
const { isAuth } = require('../middleswares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

// TODO change endpoints
// router.get('/catalog', async (req, res) => {
//     try {
//         const allItems = await itemManager.getAll().lean();
//         res.render('photos/catalog', { allItems });
//     } catch (error) {
//         res.render('photos/catalog', { error: 'Couldn\'t find photos.' });
//     }

// });

// router.get('/create', isAuth, (req, res) => {
//     res.render('photos/create');
// });

// router.post('/create', isAuth, async (req, res) => {

//     try {
//         // TODO chnage item obj
//         const { name, image, age, description, location } = req.body;
//         const userId = req.user._id;
//         const created = await itemManager.create(name, image, age, description, location, userId);

//         res.redirect('/photos/catalog');
//     } catch (error) {
//         return res.status(404).render('photos/create', { error: getErrorMessage(error) });
//     }
// });

// router.get('/details/:photoId', async (req, res) => {

//     try {
//         const item = await itemManager.getById(req.params.itemId).populate('comments.user').lean();
//         if (req.user) {
//             item.isOwner = req.user._id == item.owner._id;
//             item.user = true;
//         }
//         res.render('photos/details', { item });

//     } catch (error) {
//         res.render('photos/catalog', { error: 'Couldn\'t load details.' });
//     }


// });

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