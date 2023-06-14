const Crypto = require('../models/Crypto');

exports.create = (name, image, price, description, payment, owner) =>
    Crypto.create({ name, image, price, description, payment, owner });

exports.getAllOffers = () => Crypto.find();

exports.findById = (cryptoId) => Crypto.findById(cryptoId);

exports.buyCrypto = (offer, userId) =>Crypto.findByIdAndUpdate(offer._id, {$push: {buyers: userId}});

exports.hasBought = (offerId, userId) => Crypto.findOne({ _id: offerId, buyers: { $in: [userId] } });

exports.deleteCrypto = (offerId) => Crypto.findByIdAndDelete(offerId);

exports.update = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData);