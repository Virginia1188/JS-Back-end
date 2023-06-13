const router = require('express').Router();

router.get('/create',(req,res)=>{
    res.render('crypto/create');
});

router.post('/create',async (req,res)=>{
    const {name,image,price,description, payment} = req.body;
    const owner = req.user._id;
    console.log(owner);

    await Crypto.create(name,image,price,description, payment, owner);
});

router.get('/catalog', (req,res)=>{
    res.render('crypto/catalog');
});

module.exports = router;