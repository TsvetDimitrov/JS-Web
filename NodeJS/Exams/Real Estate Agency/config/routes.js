const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const hotelController = require('../controllers/houseController');


module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/houses', hotelController);
};