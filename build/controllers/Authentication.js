"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UserModel = require('../models/Users');
var bcrypt = require('bcrypt');
var get = require('lodash/get');
var jwt = require('jsonwebtoken');
var config_json_1 = __importDefault(require("../config/config.json"));
// const CONFIG = require('../config/config');
var Authentication = /** @class */ (function () {
    function Authentication(req, res) {
        this.req = req;
        this.res = res;
    }
    Authentication.prototype.generateSalt = function () {
        var saltRound = 10;
        return bcrypt.genSaltSync(saltRound);
    };
    Authentication.prototype.generateHash = function (password, salt) {
        return bcrypt.hashSync(password, salt);
    };
    Authentication.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInput, title, firstName, lastName, userTypeId, userName, password, email, salt, hash, user, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInput = this.req.body;
                        title = userInput.title, firstName = userInput.firstName, lastName = userInput.lastName, userTypeId = userInput.userTypeId, userName = userInput.userName, password = userInput.password, email = userInput.email;
                        if (password && userName) {
                            salt = this.generateSalt();
                            hash = this.generateHash(password, salt);
                        }
                        else {
                            salt = '';
                            hash = '';
                        }
                        user = new UserModel({
                            title: title,
                            first_name: firstName,
                            last_name: lastName,
                            primary_user_type_id: userTypeId,
                            user_name: userName,
                            password: hash,
                            salt: salt,
                            email: email,
                            status: 1
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, user.save()];
                    case 2:
                        result = _a.sent();
                        // if (result) {
                        console.log('result', result);
                        this.res.send('success');
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log('err', err_1);
                        this.res.send('not valid');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Authentication.prototype.login = function () {
        var _this = this;
        var userInput = this.req.body;
        var userName = userInput.userName, password = userInput.password;
        UserModel.find({ user_name: userName }, 'user_name password salt', function (err, data) {
            if (err) {
                _this.res.send('error');
            }
            var userData = get(data, 0, []);
            var userExists = userData.user_name;
            var dbHash = userData.password;
            if (userExists) {
                var isValidUser = bcrypt.compareSync(password, dbHash);
                if (isValidUser) {
                    var token = jwt.sign({ userName: userName }, config_json_1.default.JWT.SECRET, { expiresIn: 300 });
                    _this.res.send(token);
                }
                else {
                    _this.res.send('does not match');
                }
            }
            else {
                _this.res.send('user does not exits');
            }
        });
    };
    Authentication.prototype.profile = function () {
        var _this = this;
        var userParams = this.req.params;
        var userName = userParams.userName;
        UserModel.find({ user_name: userName }, 'user_name email first_name last_name title', function (err, data) {
            if (err) {
                _this.res.send('error');
            }
            var userData = get(data, 0, []);
            var userName = userData.userName;
            var email = userData.email;
            var firstName = userData.first_name;
            var lastName = userData.last_name;
            var title = userData.title;
            _this.res.json({
                title: title,
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                email: email
            });
        });
    };
    return Authentication;
}());
module.exports = Authentication;
//# sourceMappingURL=Authentication.js.map