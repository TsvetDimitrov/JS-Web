const course = require('../services/course');


module.exports = () => (req, res, next) => {
    //TODO import and decorate services
    req.storage = { ...course };

    next();
};