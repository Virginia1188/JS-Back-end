const router = require('express').Router();

router.get('/add-cat', (req,res)=>{
    res.render('addCat');
});

router.get('/delete:catId', (req,res)=>{
    
});

router.get('/edit:catId', (req,res)=>{
    res.render('editCat');
});

module.exports = router;