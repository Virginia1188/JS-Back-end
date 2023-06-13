const Crypto = require('../models/Crypto');

exports.create = (name, image, price, description, payment, owner) =>
    Crypto.create({ name, image, price, description, payment, owner });

exports.getAllOffers = () => Crypto.find();

exports.findById = (cryptoId) => Crypto.findById(cryptoId);