const router = require('express').Router();
const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authController');
const {isAuthenticated, authentication} = require('./middlewares/authMiddleware');

router.use(homeController);
router.use(authController);
router.use('/cubes',cubeController);
router.use('/accessories', accessoryController);
router.get('*', (req,res)=>{
    res.redirect('/404');
});

module.exports = router;