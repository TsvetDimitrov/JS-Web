const router = require('express').Router();

const { isUser } = require('../middlewares/guards');

const userService = require('../services/user');

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


router.get('/details/:id', async (req, res) => {
    try {
        const trip = await req.storage.getTripById(req.params.id);
        const author = await userService.getUserById(trip.owner);

        trip.hasUser = Boolean(req.user);
        trip.isAuthor = req.user && req.user._id == trip.owner;
        trip.isBooked = req.user && trip.buddies.find(x => x == req.user._id);
        trip.authorMail = author.email;

        const reservedBy = [];
        for (let i = 0; i < trip.buddies.length; i++) {
            const tripBookedBy = await userService.getUserById(trip.buddies[i]);
            reservedBy.push(tripBookedBy.email);
        }

        trip.reservedBy = reservedBy;
        trip.seats -= trip.reservedBy.length;

        res.render('trip/details', { trip });
    } catch (err) {
        console.log(err.message);
        res.redirect('/404');
    }
});

router.get('/edit/:id', isUser(), async (req, res) => {
    try {
        const trip = await req.storage.getTripById(req.params.id);

        if (req.user._id != trip.owner) {
            throw new Error('Cannot edit trip you havent\'t created!');
        }

        res.render('trip/edit', { trip });
    } catch (err) {
        console.log(err.message);
        res.redirect('/trips');
    }
});


router.post('/edit/:id', isUser(), async (req, res) => {
    try {
        const trip = await req.storage.getTripById(req.params.id);
        if (req.user._id != trip.owner) {
            throw new Error('Cannot edit trip you havent\'t created!');
        }

        await req.storage.editTrip(req.params.id, req.body);
        res.redirect('/trips');
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
            trip: {
                _id: req.params.id,
                startPoint: req.body.startPoint,
                endPoint: req.body.endPoint,
                date: req.body.date,
                time: req.body.time,
                imageUrl: req.body.imageUrl,
                brand: req.body.brand,
                seats: req.body.seats,
                price: req.body.price,
                description: req.body.description,
            }
        }

        res.render('trip/edit', ctx);
    }
});

router.get('/reserve/:id', isUser(), async (req, res) => {
    try {
        await req.storage.reserveTrip(req.params.id, req.user._id);

        res.redirect('/trips/details/' + req.params.id);

    } catch (err) {
        console.log(err.message);
    }
});

router.get('/delete/:id', isUser(), async (req, res) => {
    try {
        const trip = await req.storage.getTripById(req.params.id);

        if (trip.owner != req.user._id) {
            throw new Error('Cannot delete trip you have\'nt created');
        }
s
        await req.storage.deleteTrip(req.params.id);
        res.redirect('/trips');
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;

