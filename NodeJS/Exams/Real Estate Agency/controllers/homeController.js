const router = require('express').Router();

router.get('/apartaments', async (req, res) => {
    const houses = await req.storage.getAllHouses();
    res.render('home/apartaments', { houses });
});

router.get('/', async (req, res) => {
    try {
        const topHouses = await req.storage.getLast3Houses();

        res.render('home/home', { topHouses });
    } catch (err) {
        console.log(err.message);
    }
});


router.get('/search', (req, res) => {
    res.render('search');

});

router.post('/search', async (req, res) => {

    const houses = await req.storage.search(req.body.text);

    res.render('search', { houses })
});

module.exports = router;