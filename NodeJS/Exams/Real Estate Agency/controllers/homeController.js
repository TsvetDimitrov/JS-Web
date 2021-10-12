const router = require('express').Router();

router.get('/', async (req, res) => {
    const houses = await req.storage.getAllHouses();
    console.log(houses);
    res.render('home/home', { houses });
});

module.exports = router;