const router = require('express').Router();

const { isUser } = require('../middlewares/guards');

router.get('/info', async (req, res) => {

    let bookedHotels = [];
    for (let i = 0; i < req.user.bookedHotels.length; i++) {
        let hotelName = await req.storage.getHotelById(req.user.bookedHotels[i]);
        bookedHotels.push(hotelName);
    }

    console.log(bookedHotels);
    
    res.render('user/profile', { req, bookedHotels });
});


module.exports = router;