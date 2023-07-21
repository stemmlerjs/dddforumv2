"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositionRoot = void 0;
var userController_1 = require("../../modules/users/controllers/userController");
var webServer_1 = require("../http/webServer");
var database_1 = require("../persistence/database");
var CompositionRoot = /** @class */ (function () {
    function CompositionRoot() {
        this.database = this.createDatabase();
        this.userController = this.createUserController();
        this.webServer = this.createWebServer();
    }
    CompositionRoot.prototype.createDatabase = function () {
        return new database_1.Database();
    };
    CompositionRoot.prototype.getDatabase = function () {
        return this.database;
    };
    CompositionRoot.prototype.createUserController = function () {
        var database = this.getDatabase();
        return new userController_1.UserController(database);
    };
    CompositionRoot.prototype.getUserController = function () {
        return this.userController;
    };
    CompositionRoot.prototype.createWebServer = function () {
        var userController = this.getUserController();
        return new webServer_1.WebServer(userController);
    };
    CompositionRoot.prototype.getWebServer = function () {
        return this.webServer;
    };
    return CompositionRoot;
}());
exports.CompositionRoot = CompositionRoot;
