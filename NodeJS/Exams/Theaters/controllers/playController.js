const router = require('express').Router();
const { isUser } = require('../middlewares/guards');
const { parseError } = require('../util/parsers');



router.get('/create', isUser(), (req, res) => {
    res.render('play/create');
});


router.post('/create', isUser(), async (req, res) => {
    console.log(req.body);
    try {
        const playData = {
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            public: Boolean(req.body.public),
            author: req.user._id
        }
        await req.storage.createPlay(playData);

        res.redirect('/');
    } catch (err) {
        console.log(err.message)
        const ctx = {
            errors: parseError(err),
            playData: {
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                public: Boolean(req.body.public),
            }
        };
        res.render('play/create', ctx);
    }
});

router.get('/details/:id', async (req, res) => {

    try {
        const play = await req.storage.getPlayById(req.params.id);
        play.hasUser = Boolean(req.user)
        play.isAuthor = req.user && req.user._id == play.author;
        play.liked = req.user && play.usersLiked.includes(req.user._id);
        res.render('play/details', { play });
    } catch (err) {
        console.log(err.message);
        res.render('/404');
    }
});


router.get('/play/delete/:id', (req, res) => {
    try{

    }catch(err){
        console.log(err.message);
        res/render
    }
});

module.exports = router;