const User = require('../models/User');
const jwt = require('../lib/jsonwebtoken');
const dbConfig = require('../config/dbConfig');
const { getErrorMessage } = require('../utils/errorUtils');

exports.findByEmail = (email) => User.findOne({ email });

// TODO check user object and amend if nessecery 
exports.register = async (email, password, repeatPassword) => {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    try {
        await User.create({ email, password, repeatPassword });
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

    };

    const token = await jwt.sign(payload, dbConfig.SECRET,);

    return token;
};





