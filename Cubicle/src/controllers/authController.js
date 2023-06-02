const router = require('express').Router();
const authManager = require('../managers/authManager');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.get('/logout', (req, res) => {
    res.render('auth/logout');
});

router.post('auth/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return res.status(404).end();
    }

    const existingUser = await authManager.getUseByUsername(username);

    if (existingUser) {
        return res.status(404).end();
    }

    const user = await authManager.register(username, password);

});

module.exports = router;