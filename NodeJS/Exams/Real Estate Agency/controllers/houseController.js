const router = require('express').Router();
const { isUser } = require('../middlewares/guards');

const {getUserById} = require('../services/user');

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
       // house.isRented = req.user && house.rentedBy.find(x => x == req.user._id);
        let names = [];
        for(let i = 0; i < house.rentedBy.length; i++){
            let name = await getUserById(house.rentedBy[i]);
            names.push(name.name);
        }
        house.renters = names.join(', ');
        if(house.renters.length > 0){
            house.isRented = true;
        }
        res.render('house/details', { house });
    } catch (err) {
        console.log(err.message);
        res.redirect('/404');
    }
});


router.get('/edit/:id', isUser(), async (req, res) => {
    try {
        const house = await req.storage.getHouseById(req.params.id);

        if (req.user._id != house.owner) {
            throw new Error('Cannot edit house you havent\'t created!');
        }

        res.render('house/edit', { house })

    } catch (err) {
        console.log(err.message);
        res.redirect('/');
    }
});

router.post('/edit/:id', isUser(), async (req, res) => {
    try {
        const house = await req.storage.getHouseById(req.params.id);

        if (req.user._id != house.owner) {
            throw new Error('Cannot edit house you havent\'t created!');
        }


        await req.storage.editHouse(req.params.id, req.body);
        res.redirect('/');
    } catch (err) {
        console.log(err.message);

    }
});

router.get('/delete/:id', isUser(), async (req, res) => {
    try {
        const house = await req.storage.getHouseById(req.params.id);

        if (house.owner != req.user._id) {
            throw new Error('Cannot delete play you have\'nt created');
        }

        await req.storage.deleteHouse(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.log(err.message);
    }
});

router.get('/book/:id', isUser(), async (req, res) => {
    try {
        const house = await req.storage.getHouseById(req.params.id);


        const isRented = house.rentedBy.find(x => x == req.user._id);

        if (isRented) {
            throw new Error('You have already rented this house!');
        }

        if (req.user._id == house.owner) {
            throw new Error('You cannot book your own house!');
        }
        house.pieces--;
        await req.storage.bookHouse(req.params.id, req.user._id);

        res.redirect('/houses/details/' + req.params.id);
    } catch (err) {
        console.log(err.message);
        console.log(err);
        const ctx = {
            errors: [err.message]
        }
        res.render('404', ctx);
    }
});

module.exports = router;
