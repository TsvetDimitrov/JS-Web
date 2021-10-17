const router = require('express').Router();

const { isUser } = require('../middlewares/guards');

router.get('/create', isUser(), (req, res) => {
    res.render('course/create');
});


router.post('/create', isUser(), async (req, res) => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log(date)
    const courseData = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        duration: req.body.duration,
        createdAt: date
    }

    console.log(courseData);

    try {
        await req.storage.createCourse(courseData);
        res.redirect('/');
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

            courseData: {
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                duration: req.body.duration,
            }
        }
        res.render('course/create', ctx);

    }
});


router.get('/details/:id', isUser(), async (req, res) => {
    try {
        const course = await req.storage.getCourseById(req.params.id);
        course.isAuthor = req.user && req.user._id == course.owner;
        course.isBooked = req.user && course.enrolledUsers.find(x => x == req.user._id);
        console.log(course);
        res.render('course/details', course);

    } catch (err) {
        console.log(err.message);

        res.redirect('/404');
    }
});

module.exports = router;