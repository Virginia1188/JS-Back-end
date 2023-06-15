const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const { authentication } = require('./middleswares/authMiddleware');


router.use(authentication);
router.use(homeController);
router.use('/auth', userController);

router.get('*', (req,res)=>{
    res.redirect('/404');
});

module.exports = router;