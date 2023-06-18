const router = require('express').Router();
const itemManager = require('../managers/itemManager');
const { isAuth, isUserAuth } = require('../middleswares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
const {getCategory} = require('../utils/viewHelpers');
const userManager = require('../managers/userManager');

// TODO change endpoints
router.get('/all-posts', async (req, res) => {
    try {
        const allItems = await itemManager.getAll().lean();
       
        if(allItems.length != 0){
            allItems.isItem = true;
        }
        res.render('posts/all-posts', { allItems});
    } catch (error) {
        res.render('posts/all-posts', { error: 'Couldn\'t find photos.' });
    }

});

router.get('/create', isAuth, (req, res) => {
    res.render('posts/create');
});

router.post('/create', isAuth, async (req, res) => {
    const { title, keyword, location, date, image, description } = req.body;
    try {
        // TODO chnage item obj
        
        console.log(req.body);
        const userId = req.user._id;
        const created = await itemManager.create( title, keyword, location, date, image, description , userId);
        await userManager.addPost(userId, created._id);
        res.redirect('/posts/all-posts');
    } catch (error) {
        return res.status(404).render('posts/create', { error: getErrorMessage(error),  title, keyword, location, date, image, description });
    }
});

router.get('/details/:itemId', async (req, res) => {

    try {
        const item = await itemManager.getById(req.params.itemId).populate('author').populate('votes').lean();
        if (req.user) {
            item.isUser = true;
            item.isOwner = req.user._id == item.author._id ? true: false;
            const index = item.votes.findIndex(x => x._id == req.user._id);
            console.log(index);
            if (index !== -1) {
                item.hasVoted = true;
            }
        }
        let emails = [];
        if(item.votes.length !== 0){
            item.hasRating = true;
            item.votes.forEach(x => {
                emails.push(x.email);
            });
        }
        const result = emails.join(', ');
        res.render('posts/details', { item, result});

    } catch (error) {
        res.render('posts/all-posts', { error: 'Couldn\'t load details.', error });
    }
});

router.get('/edit/:itemId', isAuth, async (req, res) => {
    
    try {
        const item = await itemManager.getById(req.params.itemId).lean();
      
        res.render('posts/edit', { item });
    } catch (error) {
        const item = await itemManager.getById(req.params.itemId).lean();
        res.render('posts/details', { error: getErrorMessage(error), item});
    }

});

router.post('/edit/:itemId', isAuth, async (req, res) => {
    const item = req.body;
    const itemId = req.params.itemId;

    try {
        await itemManager.update(itemId, item);
        res.redirect(`/posts/details/${itemId}`);

    } catch (error) {
        res.render('posts/edit', { error: getErrorMessage(error), item});
    }

});

router.get('/delete/:itemId', isAuth, async (req, res) => {
    try {
        await itemManager.delete(req.params.itemId);
        res.redirect('/posts/all-posts');
    } catch (error) {
        res.render('posts/details', { error: 'Couldn\'t delete photo!' });
    }

});

router.get('/vote-up/:itemId', async (req,res)=>{
   
    const userId = req.user._id;
    const itemId = req.params.itemId;
    try {
        await itemManager.upVote(itemId,userId);
        res.redirect(`/posts/details/${itemId}`);
    } catch (error) {
        res.render('posts/details', { error: getErrorMessage(error)});
    }
   
});

router.get('/vote-down/:itemId', async (req,res)=>{
   
    const userId = req.user._id;
    const itemId = req.params.itemId;
    try {
        await itemManager.downVote(itemId,userId);
        res.redirect(`/posts/details/${itemId}`);
    } catch (error) {
        res.render('posts/details', { error: getErrorMessage(error)});
    }
   
});

// router.get('/close/:itemId', (req,res)=>{
    
//     res.redirect('auctions/closed-auctions');
// });

// router.post('/post/:photoId', async (req, res) => {
//     const user = req.user._id;
//     const { comment } = req.body;
//     const itemId = req.params.itemId;
//     console.log({user, comment});

//     try {
//         await itemManager.addComment(itemId, { user, comment });
//         res.redirect(`/photos/details/${itemId}`);
//     } catch (error) {
//         res.render('photos/details', { error: getErrorMessage(error) });
//     }

// });

module.exports = router;