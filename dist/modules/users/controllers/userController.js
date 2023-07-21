"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var generateRandom_1 = require("../../../shared/utils/generateRandom");
var UserController = /** @class */ (function () {
    function UserController(database) {
        this.database = database;
    }
    UserController.prototype.getUserByEmail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var dbConnection, email, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        dbConnection = this.database.getConnection();
                        email = req.query.email;
                        return [4 /*yield*/, dbConnection.user.findUnique({ where: { email: email } })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res
                                    .status(404)
                                    .json({ error: "UserNotFound", data: undefined, success: false })];
                        }
                        return [2 /*return*/, res.json({
                                error: undefined,
                                data: {
                                    id: user.id,
                                    email: user.email,
                                    username: user.username,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                },
                                success: true,
                            })];
                    case 2:
                        error_1 = _a.sent();
                        res.status(500).json({ error: "Failed to fetch user." });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.editUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var dbConnection, userId, _a, email, username, firstName, lastName, existingUser, editedUser, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        dbConnection = this.database.getConnection();
                        userId = Number(req.params.userId);
                        _a = req.body, email = _a.email, username = _a.username, firstName = _a.firstName, lastName = _a.lastName;
                        return [4 /*yield*/, dbConnection.user.findUnique({
                                where: { id: userId },
                            })];
                    case 1:
                        existingUser = _b.sent();
                        if (!existingUser) {
                            return [2 /*return*/, res
                                    .status(404)
                                    .json({ error: "UserNotFound", data: undefined, success: false })];
                        }
                        return [4 /*yield*/, dbConnection.user.update({
                                where: { id: userId },
                                data: { email: email, username: username, firstName: firstName, lastName: lastName },
                            })];
                    case 2:
                        editedUser = _b.sent();
                        return [2 /*return*/, res.json({ error: undefined, data: editedUser, success: true })];
                    case 3:
                        error_2 = _b.sent();
                        res.status(500).json({ error: "Failed to edit user." });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var dbConnection, _a, email, username, firstName, lastName, existingUserByUsername, existingUserByEmail, user, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        dbConnection = this.database.getConnection();
                        _a = req.body, email = _a.email, username = _a.username, firstName = _a.firstName, lastName = _a.lastName;
                        return [4 /*yield*/, dbConnection.user.findUnique({
                                where: { username: username },
                            })];
                    case 1:
                        existingUserByUsername = _b.sent();
                        if (existingUserByUsername) {
                            return [2 /*return*/, res.status(409).json({
                                    error: "UsernameAlreadyTaken",
                                    data: undefined,
                                    success: false,
                                })];
                        }
                        return [4 /*yield*/, dbConnection.user.findUnique({
                                where: { email: email },
                            })];
                    case 2:
                        existingUserByEmail = _b.sent();
                        if (existingUserByEmail) {
                            return [2 /*return*/, res
                                    .status(409)
                                    .json({
                                    error: "EmailAlreadyInUse",
                                    data: undefined,
                                    success: false,
                                })];
                        }
                        return [4 /*yield*/, dbConnection.user.create({
                                data: {
                                    email: email,
                                    username: username,
                                    firstName: firstName,
                                    lastName: lastName,
                                    password: (0, generateRandom_1.randomCharacters)(15),
                                },
                            })];
                    case 3:
                        user = _b.sent();
                        return [2 /*return*/, res.status(201).json({
                                error: undefined,
                                data: {
                                    id: user.id,
                                    email: user.email,
                                    username: user.username,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                },
                                success: true,
                            })];
                    case 4:
                        error_3 = _b.sent();
                        return [2 /*return*/, res.status(500).json({
                                error: "Failed to create user.",
                                data: undefined,
                                success: false,
                            })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
