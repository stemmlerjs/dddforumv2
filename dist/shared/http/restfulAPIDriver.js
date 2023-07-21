"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESTfulAPIDriver = void 0;
var supertest_1 = __importDefault(require("supertest"));
var RESTfulAPIDriver = /** @class */ (function () {
    function RESTfulAPIDriver(http) {
        this.http = http;
    }
    RESTfulAPIDriver.prototype.post = function (url, data) {
        return (0, supertest_1.default)(this.http)
            .post(url)
            .set("Accept", "application/json")
            .send(data);
    };
    RESTfulAPIDriver.prototype.get = function (url) {
        return (0, supertest_1.default)(this.http)
            .get(url);
    };
    return RESTfulAPIDriver;
}());
exports.RESTfulAPIDriver = RESTfulAPIDriver;
