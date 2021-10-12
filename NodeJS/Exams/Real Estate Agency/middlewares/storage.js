const house = require('../services/house');

module.exports = () => (req, res, next) => {
    //TODO import and decorate services

    req.storage = {
        ...house
    };

    next();
};