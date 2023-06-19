const router = require('express').Router();
const userManager = require('../managers/userManager');
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

        return res.status(404).render('users/login', { error: getErrorMessage(error), email});
    }

});


router.get('/register', isUserAuth, (req, res) => {
    res.render('users/register');
});

router.post('/register', isUserAuth, async (req, res) => {
    const { email, password, repeatPassword } = req.body;
    try {
        const token = await userManager.register(email, password, repeatPassword);
        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        res.status(400).render('users/register', { error: getErrorMessage(error), email });
    }

});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});


module.exports = router;