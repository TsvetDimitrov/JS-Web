const router = require('express').Router();

const { isUser } = require('../middlewares/guards');

router.get('/create', isUser(), (req, res) => {
    res.render('course/create');
});


router.post('/create', isUser(), async (req, res) => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const courseData = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        duration: req.body.duration,
        createdAt: date,
        owner: req.user._id
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


        course.hasUser = Boolean(req.user);
        course.isAuthor = req.user && req.user._id == course.owner;
        course.isBooked = req.user && course.enrolledUsers.find(x => x == req.user._id);

        console.log(course.isAuthor);
        res.render('course/details', course);

    } catch (err) {
        console.log(err.message);

        res.redirect('/404');
    }
});

router.get('/edit/:id', isUser(), async (req, res) => {
    try {
        const course = await req.storage.getCourseById(req.params.id);
        if (req.user._id != course.owner) {
            throw new Error('Cannot edit course you havent\'t created!');
        }

        res.render('course/edit', course);
    } catch (err) {
        console.log(err.message);
        res.redirect('/');
    }
});


router.post('/edit/:id', isUser(), async (req, res) => {
    try {
        const course = await req.storage.getCourseById(req.params.id);
        if (req.user._id != course.owner) {
            throw new Error('Cannot course trip you havent\'t created!');
        }

        await req.storage.editCourse(req.params.id, req.body);
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
            course: {
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                duration: req.body.duration,
                _id: req.params.id,

            }
        }



        res.render('course/edit', ctx);
    }
});


router.get('/delete/:id', isUser(), async (req, res) => {
    try{
        const course = await req.storage.getCourseById(req.params.id);

        if(course.owner != req.user._id){
            throw new Error('Cannot delete course you have\'nt created');
        }

        await req.storage.deleteCourse(req.params.id);
        res.redirect('/');
    }catch(err){
        console.log(err.message);
    }
});

router.get('/enroll/:id', isUser(), async(req, res) => {
    try{
        await req.storage.enrollCourse(req.params.id, req.user._id);

        res.redirect('/courses/details/' + req.params.id);
    }catch(err){
        console.log(err.message);
    }
});
module.exports = router;