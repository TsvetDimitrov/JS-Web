const router = require('express').Router();
const { isUser } = require('../middlewares/guards');
const userService = require('../services/user');


router.get('/create', isUser(), async (req, res) => {
    res.render('post/create');
});


router.post('/create', isUser(), async (req, res) => {
    const postData = {
        keyword: req.body.keyword,
        title: req.body.title,
        location: req.body.location,
        dateCreated: req.body.dateCreated,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        owner: req.user._id
    }

    try {
        await req.storage.createPost(postData, req.user._id);

        res.redirect('/all-posts')
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

            postData: {
                keyword: req.body.keyword,
                title: req.body.title,
                location: req.body.location,
                dateCreated: req.body.dateCreated,
                imageUrl: req.body.imageUrl,
                description: req.body.description,
            }
        }

        res.render('post/create', ctx);
    }
});


router.get('/details/:id', async (req, res) => {
    try {
        const post = await req.storage.getPostById(req.params.id);
        const voters = await userService.getUsersById(post.votesOnPost);
        const author = await userService.getUserById(post.owner);

        const mails = [];
        voters.forEach(p => mails.push(p.email));
        console.log(mails);
        const authorFullName = `${author.firstName} ${author.lastName}`;
        post.hasUser = Boolean(req.user);
        post.isAuthor = req.user && req.user._id == post.owner;
        post.authorFullName = authorFullName;
        post.voted = req.user && post.votesOnPost.find(u => u._id == req.user._id);
        post.mails = mails.join(', ');
        // const reservedBy = [];
        // for (let i = 0; i < trip.buddies.length; i++) {
        //     const tripBookedBy = await userService.getUserById(trip.buddies[i]);
        //     reservedBy.push(tripBookedBy.email);
        // }

        // trip.reservedBy = reservedBy;
        // trip.seats -= trip.reservedBy.length;

        res.render('post/details', { post });
    } catch (err) {
        console.log(err.message);
        res.redirect('/404');
    }
});


router.get('/edit/:id', isUser(), async (req, res) => {
    let redirectToHome = false;

    try {
        const post = await req.storage.getPostById(req.params.id);

        if (req.user._id != post.owner) {
            redirectToHome = true;

            throw new Error('Cannot edit post you havent\'t created!');
        }

        res.render('post/edit', { post });
    } catch (err) {
        console.log(err.message);

        if (redirectToHome) {
            return res.redirect('/')
        } else {
            res.redirect('/all-posts');

        }
    }
});

router.post('/edit/:id', isUser(), async (req, res) => {
    try {
        const post = await req.storage.getPostById(req.params.id);
        if (req.user._id != post.owner) {
            throw new Error('Cannot edit post you havent\'t created!');
        }
        console.log(req.body);
        await req.storage.editPost(req.params.id, req.body);
        res.redirect('/all-posts');
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
            post: {
                _id: req.params.id,
                keyword: req.body.keyword,
                title: req.body.title,
                location: req.body.location,
                dateCreated: req.body.dateCreated,
                imageUrl: req.body.imageUrl,
                description: req.body.description,
            }
        }

        res.render('post/edit', ctx);
    }
});


router.get('/delete/:id', isUser(), async (req, res) => {
    let redirectToHome = false;

    try {
        const trip = await req.storage.getPostById(req.params.id);

        if (trip.owner != req.user._id) {
            redirectToHome = true;
            throw new Error('Cannot delete post you have\'nt created');
        }

        await req.storage.deletePost(req.params.id);
        res.redirect('/all-posts');
    } catch (err) {
        if (redirectToHome) {
            res.redirect('/');
        }
        console.log(err.message);
    }
});

router.get('/upvote/:id', isUser(), async (req, res) => {
    try {
        await req.storage.upvote(req.params.id, req.user._id);

        res.redirect('/post/details/' + req.params.id);

    } catch (err) {
        console.log(err.message);
    }
});

router.get('/downvote/:id', isUser(), async (req, res) => {
    try {
        await req.storage.downVote(req.params.id, req.user._id);

        res.redirect('/post/details/' + req.params.id);

    } catch (err) {
        console.log(err.message);
    }
});


module.exports = router;
