"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
var CONFIG = require('../config/config');
var TokenVerification = function (req, res, next) {
    var token = req.headers['x-auth-token'];
    if (!token) {
        res.send('missing token header');
    }
    try {
        var decoded = jwt.verify(token, CONFIG.JWT.SECRET);
        var userName = decoded.userName;
        res.userName = userName;
        next();
    }
    catch (e) {
        res.send('invalid token, please login again!');
    }
};
exports.default = TokenVerification;
// module.exports = TokenVerification
//# sourceMappingURL=TokenVerification.js.map