const trip = require('../services/trips');

module.exports = () => (req, res, next) => {
    //TODO import and decorate services
    req.storage = {
        ...trip
    };

    next();
};