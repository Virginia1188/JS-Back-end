const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const { authentication } = require('./middleswares/authMiddleware');
const photoController = require('./controllers/photoController');


router.use(authentication);
router.use(homeController);
router.use('/users', userController);
router.use('/photos', photoController);

router.get('*', (req,res)=>{
    res.redirect('/404');
});

module.exports = router;