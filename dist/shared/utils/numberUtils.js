"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomInteger = void 0;
function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}
exports.generateRandomInteger = generateRandomInteger;
