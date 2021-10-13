const router = require('express').Router();

const { isUser } = require('../middlewares/guards');

router.get('/create', isUser(), (req, res) => {
    res.render('trip/create');
});

router.post('/create', isUser(), async (req, res) => {

});

module.exports = router;

