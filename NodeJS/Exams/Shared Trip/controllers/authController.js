const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest } = require('../middlewares/guards');


router.get('/register', isGuest(), (req, res) => {
    res.render('user/register');
});

router.post('/register',
    isGuest(),
    body('email', 'Invalid email').isEmail(),
    body('password').isLength({ min: 2 }).withMessage('Password must be at least 2 characters long').bail(), //Change the passwrod length to 4 chars as required!
    body('rePass').custom((value, { req }) => {
        if (value != req.body.password) {
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
            await req.auth.register(req.body.email, req.body.gender, req.body.password);

            res.redirect('/');
        } catch (err) {
            console.log(err.message);
            const ctx = {
                errors: err.message.split('\n'),
                userData: {
                    gender: req.body.gender,
                    email: req.body.email
                }
            }
            console.log(ctx);
            res.render('user/register', ctx);
        }

    });

router.get('/login', isGuest(), (req, res) => {
    res.render('user/login');
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        await req.auth.login(req.body.email, req.body.password);

        res.redirect('/');
    } catch (err) {
        console.log(err.message);
        const ctx = {
            errors: [err.message],
            userData: {
                username: req.body.username
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