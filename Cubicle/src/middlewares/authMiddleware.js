const jwt = require('../lib/jwt');
const dbConfig = require('../config/dbConfig');

exports.authentication = async (req, res, next) => {

    const token = req.cookies['auth'];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, dbConfig.SECRET);
            req.user = decodedToken;
            // req.isAuthenticated = true;
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
    if (!req.isAuthenticated) {
        return res.redirect('/login');
    }
    next();
};

