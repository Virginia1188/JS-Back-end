const router = require('express').Router();
const authManager = require('../managers/authManager');
const { extractErrorMessages } = require('../utils/errorHelpers');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const token = await authManager.login(username, password);
    res.cookie('auth', token, { httpOnly: true });
    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});


router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    try {
        const user = await authManager.register(username, password, repeatPassword);
        res.redirect('/users/login');

    } catch (error) {
        const errorMessages = extractErrorMessages(error);
        res.status(404).render('auth/register', { errorMessage: errorMessages });
    }

});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;