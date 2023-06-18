const router = require('express').Router();
const userManager = require('../managers/userManager');
const itemManager = require('../managers/itemManager');
const { isAuth, isUserAuth } = require('../middleswares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/login', isUserAuth, (req, res) => {
    res.render('users/login');
});

router.post('/login', isUserAuth, async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await userManager.login(email, password);
        res.cookie('auth', token);
        res.redirect('/');

    } catch (error) {

        return res.status(404).render('users/login', { error: getErrorMessage(error) });
    }

});


router.get('/register', isUserAuth, (req, res) => {
    res.render('users/register');
});

router.post('/register', isUserAuth, async (req, res) => {
    const { firstName, lastName, email, password, repeatPassword } = req.body;

    try {
        const token = await userManager.register(firstName, lastName, email, password, repeatPassword);
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

router.get('/my-posts', async (req, res) => {
    const user = await userManager
        .findByEmail(req.user.email)
        .populate({ path: 'myPosts', populate: { path: 'author' } })
        .lean();
    console.log(user);
    if (user.myPosts.length != 0) {
        user.hasPosts = true;
    }
    console.log(user);
    res.render('users/my-posts', { user });
});

module.exports = router;