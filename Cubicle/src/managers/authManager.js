const User = require('../models/User');
const dbConfig = require('../config/dbConfig');
const jwt = require('../lib/jwt');


exports.getUseByUsername = (username) => User.findOne({ username });

exports.register = (username, password, repeatPassword) => 
    User.create({ username, password,repeatPassword });

exports.login = async (username, password) => {
    const user = await this.getUseByUsername(username);

    const isValid = await user.validatePassword(password);

    if (!user || !isValid) {
        throw 'Invalid username or password!';
    }

    const payload = { 
        _id: user._id,
        username: user.username 
    };
    const token = await jwt.sign(payload, dbConfig.SECRET, { expiresIn: '1d' });

    return token;
};