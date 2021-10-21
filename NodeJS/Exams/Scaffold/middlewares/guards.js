function isUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            //may redirect to 404
            res.redirect('/auth/login');
        }
    }
}

function isGuest() {
    return (req, res, next) => {
        if (!req.user) {
            next();
        } else {
            //may redirect to 404
            res.redirect('/');
        }
    }
}


module.exports = {
    isGuest,
    isUser
}