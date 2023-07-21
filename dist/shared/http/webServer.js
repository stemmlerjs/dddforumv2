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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebServer = void 0;
var express_1 = __importDefault(require("express"));
var processService_1 = require("../processes/processService");
var WebServer = /** @class */ (function () {
    function WebServer(constructor) {
        this.express = this.createExpress();
        this.configureExpress();
        this.setupRoutes(constructor);
        this.state = 'Stopped';
    }
    WebServer.prototype.setupRoutes = function (userController) {
        // Create a new user
        this.express.post("/users/new", function (req, res) { return userController.createUser(req, res); });
        // Edit a user
        this.express.post("/users/edit/:userId", function (req, res) { return userController.editUser(req, res); });
        // Get a user by email
        this.express.get("/users", function (req, res) { return userController.getUserByEmail(req, res); });
        this.express.get('/health', function (req, res) {
            return res.send({ ok: true }).status(200);
        });
    };
    WebServer.prototype.configureExpress = function () {
        this.express.use(express_1.default.json());
    };
    WebServer.prototype.createExpress = function () {
        return (0, express_1.default)();
    };
    WebServer.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var port;
            var _this = this;
            return __generator(this, function (_a) {
                port = 3000;
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, processService_1.ProcessService.killProcessOnPort(port, function () {
                                        _this.http = _this.express.listen(port, function () {
                                            console.log("Server is running on port ".concat(port));
                                            _this.state = 'Started';
                                            resolve();
                                        });
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    WebServer.prototype.isRunning = function () {
        return this.state === 'Started';
    };
    WebServer.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.isRunning())
                    return [2 /*return*/];
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var _a;
                        (_a = _this.http) === null || _a === void 0 ? void 0 : _a.close(function () {
                            _this.state = 'Stopped';
                            resolve();
                        });
                    })];
            });
        });
    };
    WebServer.prototype.getHttp = function () {
        if (!this.isRunning())
            throw new Error('Not yet started');
        return this.http;
    };
    return WebServer;
}());
exports.WebServer = WebServer;
