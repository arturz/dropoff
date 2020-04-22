"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_regex_1 = __importDefault(require("url-regex"));
exports.default = (path) => url_regex_1.default().test(path);
