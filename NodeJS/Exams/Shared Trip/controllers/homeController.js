const router = require('express').Router();

router.get('/', (req, res) => {

    res.render('home/home');
});

router.get('/trips', async (req, res) => {
    const trips = await req.storage.getAllTrips();

    res.render('shared-trips', { trips });
});

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;