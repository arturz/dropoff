"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dropoff_1 = __importDefault(require("./lib/dropoff"));
exports.default = (entry = 'index.html', output = 'dest.html', { maxSize } = { maxSize: 8 }) => dropoff_1.default(entry, output, {
    maxInlinableFilesize: maxSize * 1024,
    isCLI: false
});
