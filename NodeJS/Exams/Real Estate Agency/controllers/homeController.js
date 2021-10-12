const router = require('express').Router();

router.get('/', async (req, res) => {
    const houses = await req.storage.getAllHouses();
    res.render('home/home', { houses });
});

module.exports = router;