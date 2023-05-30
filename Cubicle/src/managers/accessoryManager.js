const Accessesory = require('../models/Accessory');

exports.create = (accessoryData) => Accessesory.create(accessoryData);

exports.getAll = ()=> Accessesory.find();

exports.getAvailable = (accessoryIds) =>Accessesory.find({_id: {$nin: accessoryIds}});