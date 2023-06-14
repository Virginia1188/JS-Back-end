const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../config/dbConfig');


exports.authentication = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET);

            req.user = decodedToken;
            res.locals.isAuthenticated = true;
            res.locals.user = decodedToken;

            next();

        } catch (error) {
            res.clearCookie('auth');
            return res.status(401).render('404');
        }

    }else{
        next();
    }
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        res.redirect('/users/login');
    }
    next();
};