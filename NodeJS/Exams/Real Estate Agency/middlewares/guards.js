function isUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.render('404');
        }
    }
}

function isGuest() {
    return (req, res, next) => {
        if (!req.user) {
            next();
        } else {
            res.render('404');
        }
    }
}


module.exports = {
    isGuest,
    isUser
}