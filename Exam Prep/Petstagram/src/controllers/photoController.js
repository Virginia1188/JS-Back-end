const router = require('express').Router();
const photoManager = require('../managers/photoManager');
const { isAuth } = require('../middleswares/authMiddleware');
const {getErrorMessage} = require('../utils/errorUtils');

router.get('/catalog', async (req,res)=>{
    const allPhotos = await photoManager.getAll().lean();
    console.log(allPhotos);
    res.render('photos/catalog', {allPhotos});

});

router.get('/create', isAuth, (req,res)=>{
    res.render('photos/create');
});

router.post('/create', isAuth, async (req,res)=>{

    try {
        const {name, image, age, description, location} = req.body;
        const userId = req.user._id;
        const created = await photoManager.create(name, image, age, description, location, userId);
    
        res.redirect('/photos/catalog');
    } catch (error) {
        return res.status(404).render('photos/create', { error: getErrorMessage(error) });
    }
});

router.get('/details/:photoId', async (req,res)=>{

   try {
        
    const photo = await photoManager.getById(req.params.photoId).lean();
    if(req.user){
        photo.isOwner = req.user._id == photo.owner;
    }
    res.render('photos/details', {photo});

   } catch (error) {
    
   }

    
});

router.get('/edit/:photoId', isAuth, async (req,res)=>{
    const photo = await photoManager.getById(req.params.photoId).lean();

    res.render('photos/edit', {photo});
});

router.post('/edit/:photoId', isAuth, async (req,res)=>{
    const photoData = req.body;
    const photoId = req.params.photoId;
    await photoManager.update(photoId, photoData);

    res.redirect(`/photos/details/${photoId}`);
});

router.get('/delete/:photoId', isAuth, async (req,res)=>{
    await photoManager.delete(req.params.photoId);
    res.redirect('/photos/catalog');
});
module.exports = router;
