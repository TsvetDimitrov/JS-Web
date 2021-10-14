const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(res);

    res.render('home/home');
});

router.get('/trips', async (req, res) => {
    const trips = await req.storage.getAllTrips();

    res.render('shared-trips', { trips });
});

module.exports = router;