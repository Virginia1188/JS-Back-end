const router = require('express').Router();
const photoManager = require('../managers/photoManager');
const { isAuth } = require('../middleswares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/catalog', async (req, res) => {
    try {
        const allPhotos = await photoManager.getAll().lean();
        res.render('photos/catalog', { allPhotos });
    } catch (error) {
        res.render('photos/catalog', { error: 'Couldn\'t find photos.' });
    }

});

router.get('/create', isAuth, (req, res) => {
    res.render('photos/create');
});

router.post('/create', isAuth, async (req, res) => {

    try {
        const { name, image, age, description, location } = req.body;
        const userId = req.user._id;
        const created = await photoManager.create(name, image, age, description, location, userId);

        res.redirect('/photos/catalog');
    } catch (error) {
        return res.status(404).render('photos/create', { error: getErrorMessage(error) });
    }
});

router.get('/details/:photoId', async (req, res) => {

    try {

        const photo = await photoManager.getById(req.params.photoId).populate('comments.user').lean();
        if (req.user) {
            photo.isOwner = req.user._id == photo.owner._id;
            photo.user = true;
        }
        res.render('photos/details', { photo });

    } catch (error) {
        res.render('photos/catalog', { error: 'Couldn\'t load details.' });
    }


});

router.get('/edit/:photoId', isAuth, async (req, res) => {

    try {
        const photo = await photoManager.getById(req.params.photoId).lean();

        res.render('photos/edit', { photo });
    } catch (error) {
        res.render('photos/details', { error: getErrorMessage(error) });
    }

});

router.post('/edit/:photoId', isAuth, async (req, res) => {
    const photoData = req.body;
    const photoId = req.params.photoId;

    try {
        await photoManager.update(photoId, photoData);
        res.redirect(`/photos/details/${photoId}`);

    } catch (error) {
        res.render('photos/edit', { error: getErrorMessage(error), photoData });
    }

});

router.get('/delete/:photoId', isAuth, async (req, res) => {
    try {
        await photoManager.delete(req.params.photoId);
        res.redirect('/photos/catalog');
    } catch (error) {
        res.render('photos/details', { error: 'Couldn\'t delete photo!' });
    }

});

router.post('/post/:photoId', async (req, res) => {
    const user = req.user._id;
    const { comment } = req.body;
    const photoId = req.params.photoId;
    console.log({user, comment});

    try {
        await photoManager.addComment(photoId, { user, comment });
        res.redirect(`/photos/details/${photoId}`);
    } catch (error) {
        res.render('photos/details', { error: getErrorMessage(error) });
    }

});

module.exports = router;
