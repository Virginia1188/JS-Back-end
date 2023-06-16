const router = require('express').Router();
const userManager = require('../managers/userManager');
const { isAuth } = require('../middleswares/authMiddleware');
const {getErrorMessage} = require('../utils/errorUtils');

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await userManager.login(email, password);
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
    const { username, email, password, repeatPassword } = req.body;
    try {
        const token = await userManager.register(username, email, password, repeatPassword);
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


module.exports = router;