const router = require('express').Router();

const { isUser } = require('../middlewares/guards');

router.get('/create', isUser(), (req, res) => {
    res.render('trip/create');
});

router.post('/create', isUser(), async (req, res) => {
    const tripData = {
        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date: req.body.date,
        time: req.body.time,
        imageUrl: req.body.imageUrl,
        carBrand: req.body.carBrand,
        seats: req.body.seats,
        price: req.body.price,
        description: req.body.description,
        owner: req.user._id
    }

    try {
        await req.storage.createTrip(tripData);

        res.redirect('/trips')
    } catch (err) {
        console.log(err.message);
        let errors;

        if (err.errors) {
            errors = Object.values(err.errors).map(e => e.properties.message);
        } else {
            errors = [err.message];
        }

        const ctx = {
            errors,

            tripData: {
                startPoint: req.body.startPoint,
                endPoint: req.body.endPoint,
                date: req.body.date,
                time: req.body.time,
                imageUrl: req.body.imageUrl,
                carBrand: req.body.carBrand,
                seats: req.body.seats,
                price: req.body.price,
                description: req.body.description,
            }
        }

        res.render('trip/create', ctx);
    }
});


router.get('/details/:id', isUser(), async (req, res) => {
    try {


        const trip = await req.storage.getTripById(req.params.id);
        trip.hasUser = Boolean(req.user);
        trip.isAuthor = req.user && req.user._id == trip.owner;
        trip.isBooked = req.user && trip.buddies.find(x => x == req.user._id);
        trip.authorMail = res.locals.user.email;
        console.log(trip);
        res.render('trip/details', { trip });
    } catch (err) {
        console.log(err.message);
        res.redirect('/404');
    }
});

module.exports = router;

