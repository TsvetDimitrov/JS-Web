const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest } = require('../middlewares/guards');


router.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

router.post('/register',
    isGuest(),
    body('name').matches(/^[A-Z][a-z]+\s[A-Z][a-z]+$/).withMessage('Name not content the correct sign'),
    body('username').isLength({ min: 3 }).withMessage('Username must be atleast 3 characters long!'),
    body('rePass').custom((value, { req }) => {
        console.log(value);
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
            await req.auth.register(req.body.name, req.body.username, req.body.password);

            res.redirect('/');
        } catch (err) {
            console.log(err);
            const ctx = {
                errors: err.message.split('\n'),
                userData: {
                    username: req.body.username,
                    name: req.body.name
                }
            }
            res.render('register', ctx);
        }

    });
router.get('/login', isGuest(), (req, res) => {
    res.render('login');
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        await req.auth.login(req.body.username, req.body.password);

        res.redirect('/');
    } catch (err) {
        console.log(err.message);
        const ctx = {
            errors: [err.message],
            userData: {
                username: req.body.username
            }
        }
        res.render('login', ctx);

    }

});


router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
});
module.exports = router;