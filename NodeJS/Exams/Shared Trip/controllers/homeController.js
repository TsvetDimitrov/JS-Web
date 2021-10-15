const router = require('express').Router();

const userService = require('../services/user');

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

router.get('/profile', async (req, res) => {

    try {
        const userData = await userService.getUserById(req.user._id);
        userData.tripCounts = userData.tripHistory.length;
        let reserved = {};

        if (userData.tripHistory.length > 0) {
            for (let i = 0; i < userData.tripHistory.length; i++) {
                let trip = await req.storage.getTripById(userData.tripHistory[i]);
                reserved[i] = trip;
            }

            userData['reserved'] = reserved;
        }

        console.log(reserved);

        console.log(userData);
        res.render('user/profile', userData);

    } catch (err) {
        console.log(err.message);
    }

});

module.exports = router;