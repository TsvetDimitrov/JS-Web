const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest } = require('../middlewares/guards');


router.get('/register', isGuest(), (req, res) => {
    console.log('here');
    res.render('user/register');
});

router.post('/register',
    isGuest(),
    body('firstName').isLength({ min: 3 }).withMessage('firstName must be atleast 3 characters long!'),
    body('lastName').isLength({ min: 5 }).withMessage('lastName must be atleast 3 characters long!'),
    body('email').matches(/[a-z]+@[a-z]+.[a-z]+/).withMessage('should be valid mail! - <name>@<domain>.<extension>'),
    body('pass').isLength({ min: 4 }).withMessage('password must be atleast 4 characters long!'),
    body('rePass').custom((value, { req }) => {
        if (value != req.body.pass) {
            throw new Error('Passwords don\'t match');
        }
        return true;
    }),
    async (req, res) => {
        const { errors } = validationResult(req);
        try {
            if (errors.length > 0) {
                const message = errors.map(e => e.msg).join('\n');
                throw new Error(message);
            }
            await req.auth.register(req.body.firstName, req.body.lastName, req.body.email, req.body.pass);
            res.redirect('/');
        } catch (err) {
            console.log(err);
            const ctx = {
                errors: err.message.split('\n'),
                userData: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email
                }
            }
            res.render('user/register', ctx);
        }

    });
router.get('/login', isGuest(), (req, res) => {
    res.render('user/login');
});

router.post('/login',
    isGuest(),
    body('email').isEmail().withMessage('should be valid mail!'),
    async (req, res) => {
        const { errors } = validationResult(req);
        try {
            if (errors.length > 0) {
                const message = errors.map(e => e.msg).join('\n');
                throw new Error(message);
            }
            await req.auth.login(req.body.email, req.body.pass);

            res.redirect('/');
        } catch (err) {
            console.log(err);
            const ctx = {
                errors: err.message.split('\n'),
                userData: {
                    email: req.body.email
                }
            }
            res.render('user/login', ctx);
        }
    });


router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
});
module.exports = router;