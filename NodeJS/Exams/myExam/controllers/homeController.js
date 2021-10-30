const router = require('express').Router();
const { isUser } = require('../middlewares/guards');
const userService = require('../services/user');


router.get('/', (req, res) => {
    res.render('home/home');
})

router.get('/all-posts', async (req, res) => {
    const posts = await req.storage.getAllPosts();
    res.render('all-posts', { posts });
});

router.get('/my-posts', isUser(), async (req, res) => {
    const user = await userService.getUserById(req.user._id);
    const posts = await req.storage.getUserPosts(user.myPosts);
    let fullName = `${user.firstName} ${user.lastName}`;
    posts.forEach(p => p.author = fullName);
    console.log(posts);
    console.log(res.locals);
    res.render('my-posts', {posts});
});

router.get('/404', (req, res) => {
    res.render('404');
})
module.exports = router;