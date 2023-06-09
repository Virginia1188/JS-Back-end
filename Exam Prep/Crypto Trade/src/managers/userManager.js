const User = require('../models/User');
const jwt = require('../lib/jsonwebtoken');
const dbConfig = require('../config/dbConfig');
const {getErrorMessage} = require('../utils/errorUtils');

exports.findByUsername = (username) => User.findOne({ username });
exports.findByEmail = (email) => User.findOne({ email });

// TODO check user object and amend if nessecery 
exports.register = async (username, email, password, repeatPassword) => {

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error('User already exists');
    }
    
    try {
        await User.create({ username, email, password, repeatPassword });
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }

    return this.login(email, password);
};

exports.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isValid = await user.validatePassword(password);

    if (!isValid) {
        throw new Error('Invalid email or password');
    }

    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username,
    };

    const token = await jwt.sign(payload, dbConfig.SECRET,);

    return token;
};





