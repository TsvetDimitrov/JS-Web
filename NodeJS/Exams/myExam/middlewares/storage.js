const post = require('../services/post');


module.exports = () => (req, res, next) => {
    //TODO import and decorate services
    req.storage = {...post};

    next();
};