"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var Authentication = require('../controllers/Authentication');
var TokenVerification = require('../middlewares/TokenVerification');
router.post('/register', function (req, res, next) {
    new Authentication(req, res).register();
});
router.post('/login', function (req, res, next) {
    new Authentication(req, res).login();
});
router.get('/profile/:userName', TokenVerification, function (req, res, next) {
    new Authentication(req, res).profile();
});
module.exports = router;
//# sourceMappingURL=users.js.map