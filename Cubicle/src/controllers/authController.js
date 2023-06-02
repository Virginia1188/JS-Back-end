const router = require('express').Router();

router.get('/login', (req,res)=>{
    res.render('auth/login');
});

router.get('/register', (req,res)=>{
    res.render('auth/register');
});

router.get('/logout', (req,res)=>{
    res.render('auth/logout');
});

module.exports = router;