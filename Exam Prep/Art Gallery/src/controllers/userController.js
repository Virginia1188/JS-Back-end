const router = require('express').Router();
const userManager = require('../managers/userManager');
const { isAuth } = require('../middleswares/authMiddleware');
const {getErrorMessage} = require('../utils/errorUtils');

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await userManager.login(username, password);
        res.cookie('auth', token);
        res.redirect('/');

    } catch (error) {

        return res.status(404).render('users/login', { error: getErrorMessage(error) });
    }

});


router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const { username, password, address } = req.body;
    try {
        const token = await userManager.register(username, password, address);
        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        // console.log(error);
        res.status(400).render('users/register', { error: getErrorMessage(error) });
    }

});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

router.get('/profile', async (req,res)=>{
    try {
        const userId = req.user._id;
        // const photos = await photoManager.getByOwner(user._id).lean();
        const user = await userManager.getUserItems(userId).lean();
        const pubs = user.publications.length > 0 ? false : true;
        const allPubNames = user.publications.titles.join(', ');
        res.render('users/profile', { user, pubs, allPubNames});
    } catch (error) {
        res.render('users/profile', { error: error.message });
    }
});


module.exports = router;

// router.get('/profile', async (req, res) => {


// });