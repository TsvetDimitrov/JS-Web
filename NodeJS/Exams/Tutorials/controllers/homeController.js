const router = require('express').Router();

router.get('/', async (req, res) => {
    const courses = await req.storage.getAllCourses();
    res.render('home/home', { courses });
});

router.get('/search', async (req, res) => {
    let { search } = req.query;
    console.log(req.query)
    let courses = await req.storage.search(search);

    res.render('home/home', { courses, search });
});


module.exports = router;