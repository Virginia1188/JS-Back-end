const router = require('express').Router();

router.get('/catalog', (req,res)=>{
    res.render('crypto/catalog');
});

module.exports = router;