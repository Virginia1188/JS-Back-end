const User = require('../models/User');
const jwt = require('../lib/jsonwebtoken');
const dbConfig = require('../config/dbConfig');
const {getErrorMessage} = require('../utils/errorUtils');

exports.findByUsername = (username) => User.findOne({ username });

exports.register = async (username, password, address) => {

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error('User already exists');
    }
    
    try {
        await User.create({ username, password, address});
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }

    return this.login(username, password);
};

exports.login = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isValid = await user.validatePassword(password);

    if (!isValid) {
        throw new Error('Invalid email or password');
    }

    const payload = {
        _id: user._id,
        address: user.address,
        username: user.username,
    };

    const token = await jwt.sign(payload, dbConfig.SECRET,);

    return token;
};





