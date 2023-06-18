const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const itemController = require('./controllers/itemController');
const { authentication } = require('./middleswares/authMiddleware');


router.use(authentication);
router.use(homeController);
router.use('/users', userController);
router.use('/posts', itemController);

router.get('*', (req,res)=>{
    res.redirect('/404');
});

module.exports = router;