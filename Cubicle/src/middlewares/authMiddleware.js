const jwt = require('../lib/jwt');
const dbConfig = require('../config/dbConfig');

exports.authentication = async (req, res, next) => {

    const token = req.cookies['auth'];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, dbConfig.SECRET);
            req.user = decodedToken;
            res.locals.isAuthenticated = true;
            res.locals.user = decodedToken;

        } catch (err) {
            console.log(err.message);

            res.clearCookie('auth');
            res.redirect('/404');
        }
    }
    next();
};

exports.isAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/users/login');
    }
    next();
};



