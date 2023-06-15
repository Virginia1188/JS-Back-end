const express = require('express');
const path = require('path');
const cookieParcer = require('cookie-parser');

function expressConfig(app) {
    app.use(express.static(path.resolve(__dirname, '../static')));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParcer());
}

module.exports = expressConfig;