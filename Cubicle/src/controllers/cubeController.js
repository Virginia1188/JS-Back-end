const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');
const accessoryManager = require('../managers/accessoryManager');
const { isAuthenticated, authentication } = require('../middlewares/authMiddleware');
const { getDifficultyOptionsViewData } = require('../utils/viewHelpers');

router.get('/create', isAuthenticated, (req, res) => {
    res.render('cube/create');
});

router.post('/create', isAuthenticated, async (req, res) => {

    const { name, description, imageUrl, difficultyLevel } = req.body;
    //add validation
    await cubeManager.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
        owner: req.user._id,
    });
    res.redirect('/');
});

router.get('/:cubeId/details', async (req, res) => {

    const cube = await cubeManager.getOneWithAccessories(req.params.cubeId).lean();

    if (!cube) {
        return res.redirect('/404');
    }

    const isOwner = cube.owner?.toString()== req.user._id;

    res.render('cube/details', { cube, isOwner });
});

router.get('/:cubeId/attach-accessory', async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();
    const accessories = await accessoryManager.getAvailable(cube.accessories).lean();

    const hasAccessories = accessories.length > 0;

    res.render('accessory/attach', { cube, accessories, hasAccessories });
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
    const { accessory: accessoryId } = req.body;
    const cubeId = req.params.cubeId;

    await cubeManager.attachAccessory(cubeId, accessoryId);
    res.redirect(`/cubes/${cubeId}/details`);
});

router.get('/:cubeId/delete', async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();
    const options = getDifficultyOptionsViewData(cube.difficultyLevel);
    res.render('cube/delete', { cube, options });
});

router.post('/:cubeId/delete', async (req, res) => {
    await cubeManager.delete(req.params.cubeId);
    res.redirect('/');
});

router.get('/:cubeId/edit', async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();
    const options = getDifficultyOptionsViewData(cube.difficultyLevel);

    res.render('cube/edit', { cube, options });
});

router.post('/:cubeId/edit', async (req, res) => {
    const cubeData = req.body;

    await cubeManager.update(req.params.cubeId, cubeData);

    res.redirect(`/cubes/${req.params.cubeId}/details`);
});


module.exports = router;
