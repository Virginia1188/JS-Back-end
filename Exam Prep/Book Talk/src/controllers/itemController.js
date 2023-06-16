const router = require('express').Router();
const itemManager = require('../managers/itemManager');
const { isAuth, isUserAuth } = require('../middleswares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
const {getCategory} = require('../utils/viewHelpers');

// TODO change endpoints
router.get('/catalog', async (req, res) => {
    try {
        const allItems = await itemManager.getAll().lean();
       
        if(allItems.length != 0){
            allItems.isItem = true;
        }
        res.render('books/catalog', { allItems});
    } catch (error) {
        res.render('books/catalog', { error: 'Couldn\'t find books.' });
    }

});

router.get('/create', isAuth, (req, res) => {
    res.render('books/create');
});

router.post('/create', isAuth, async (req, res) => {
    const { title, author, image, review, genre, stars } = req.body;
    try {
        console.log(req.body);
        const userId = req.user._id;
        const created = await itemManager.create( title, author, image, review, genre, stars , userId);

        res.redirect('/books/catalog');
    } catch (error) {
        return res.status(404).render('books/create', { error: getErrorMessage(error),  title, author, image, review, genre, stars });
    }
});

router.get('/details/:itemId', async (req, res) => {

    try {
        const item = await itemManager.getById(req.params.itemId).lean();
       
        if (req.user) {
            const hasWished = await itemManager.hasWished(req.params.itemId, req.user._id);
            item.isUser = true;
            item.isOwner = req.user._id == item.owner._id ? true: false;
            // item.isWished = !hasWished.isWished;
            if(hasWished.isWished){
                item.isWished = true;
            }
        }
        
        res.render('books/details', { item });

    } catch (error) {
        res.render('books/catalog', { error: 'Couldn\'t load details.', error });
    }
});

router.get('/edit/:itemId', isAuth, async (req, res) => {
    
    try {
        const item = await itemManager.getById(req.params.itemId).lean();
        // if(item.bidder.length !== 0){
        //     console.log(item.bidder);
        //     item.hasBidder = true;
        // }
        // const options = getCategory(item.category);
        res.render('books/edit', { item });
    } catch (error) {
        const item = await itemManager.getById(req.params.itemId).lean();
        res.render('books/edit', { error: getErrorMessage(error), item});
    }

});

router.post('/edit/:itemId',isAuth, async (req,res)=>{
    const item = req.body;
    const itemId = req.params.itemId;

    try {
        await itemManager.updated(itemId, item);
        res.redirect(`/books/details/${itemId}`);

    } catch (error) {
        res.render('books/edit', { error: getErrorMessage(error), item });
    }
});

router.get('/wish/:itemId', isAuth, async (req, res) => {
    const itemData = req.body;
    const itemId = req.params.itemId;

    try {
        await itemManager.updateWishList(itemId, req.user._id);
        res.redirect(`/books/details/${itemId}`);

    } catch (error) {
        res.render(`/books/details/${itemId}`, { error: getErrorMessage(error)});
    }

});

router.get('/delete/:itemId', isAuth, async (req, res) => {
    try {
        await itemManager.delete(req.params.itemId);
        res.redirect('/books/catalog');
    } catch (error) {
        res.render('books/details', { error: 'Couldn\'t delete review!' });
    }

});



module.exports = router;