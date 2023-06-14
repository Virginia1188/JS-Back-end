const Crypto = require('../models/Crypto');

exports.create = (name, image, price, description, payment, owner) =>
    Crypto.create({ name, image, price, description, payment, owner });

exports.getAllOffers = async(search,payment) => {
   let offers = await Crypto.find().lean();

   if(search){
    offers = offers.filter(offer => offer.name.toLowerCase().includes(search.toLowerCase()));
   }
   if(payment){
    offers = offers.filter(offer => offer.payment.toLocaleLowerCase() == payment.toLocaleLowerCase());
   }
   return offers;
};

exports.findById = (cryptoId) => Crypto.findById(cryptoId);

exports.buyCrypto = (offer, userId) =>Crypto.findByIdAndUpdate(offer._id, {$push: {buyers: userId}});

exports.hasBought = (offerId, userId) => Crypto.findOne({ _id: offerId, buyers: { $in: [userId] } });

exports.deleteCrypto = (offerId) => Crypto.findByIdAndDelete(offerId);

exports.update = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData, {runValidators:true});