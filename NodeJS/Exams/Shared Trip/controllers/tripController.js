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
        console.log(trip);

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

router.get('/delete/:id', isUser(), async (req, res) => {
    try{
        const trip = await req.storage.getTripById(req.params.id);

        if(trip.owner != req.user._id){
            throw new Error('Cannot delete trip you have\'nt created');
        }

        await req.storage.deleteTrip(req.params.id);
        res.redirect('/trips');
    }catch(err){
        console.log(err.message);
    }
});

module.exports = router;

