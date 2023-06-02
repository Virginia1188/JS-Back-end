const User = require('../models/User');

exports.getUseByUsername = (username) => User.findOne({ username });

exports.register = (username, password) => User.create({ username, password });