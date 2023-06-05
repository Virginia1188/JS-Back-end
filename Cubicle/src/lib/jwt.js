const jwtCallback = require('jsonwebtoken');
const util = require('util');

const jwt = {
   sign: util.promisify(jwtCallback.sign),
   verify: util.promisify(jwtCallback.verify),
};

module.exports = jwt;