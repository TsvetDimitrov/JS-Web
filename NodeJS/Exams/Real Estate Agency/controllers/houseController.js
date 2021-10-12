const router = require('express').Router();
const { isUser } = require('../middlewares/guards');

router.get('/create', isUser(), (req, res) => {
    res.render('house/create')
});

router.post('/create', isUser(), async (req, res) => {
    const houseData = {
        name: req.body.name,
        type: req.body.type,
        year: req.body.year,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        pieces: req.body.pieces,
        description: req.body.description,
        rentedBy: [],
        owner: req.user._id,
    };


    try {
        await req.storage.createHouse(houseData);

        res.redirect('/')
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

            houseData: {
                name: req.body.name,
                type: req.body.type,
                year: req.body.year,
                city: req.body.city,
                imageUrl: req.body.imageUrl,
                pieces: req.body.pieces,
                description: req.body.description,
            }
        }
        res.render('house/create', ctx);
    }
});

router.get('/details/:id', async (req, res) => {
    try {

        const house = await req.storage.getHouseById(req.params.id);

        house.hasUser = Boolean(req.user);
        house.isAuthor = req.user && req.user._id == house.owner;
        house.isRented = req.user && house.rentedBy.find(x => x == req.user._id);

        res.render('house/details', { house });
    } catch (err) {
        console.log(err.message);
        res.redirect('/404');
    }
});

module.exports = router;
