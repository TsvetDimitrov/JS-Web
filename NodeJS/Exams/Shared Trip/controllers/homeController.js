const router = require('express').Router();

router.get('/',  (req, res) => {
    res.render('home/home');
});

router.get('/trips', async (req, res) => {
    
});

module.exports = router;