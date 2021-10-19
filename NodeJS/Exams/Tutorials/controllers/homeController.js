const router = require('express').Router();

router.get('/', async (req, res) => {
    const courses = await req.storage.getAllCourses();
    res.render('home/home', { courses });
});

router.get('/search', async (req, res) => {
    let { searchText } = req.query;
    let courses = await req.storage.search(searchText);

    res.render('home/home', { courses, searchText });
});


module.exports = router;