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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const getContent_1 = __importDefault(require("../utils/getContent"));
const minifyJs_1 = __importDefault(require("../minifiers/minifyJs"));
const withoutIEfix_1 = __importDefault(require("../utils/withoutIEfix"));
const isUrl_1 = __importDefault(require("../utils/isUrl"));
exports.default = (dom, baseDir) => __awaiter(void 0, void 0, void 0, function* () {
    const { window: { document } } = dom;
    const scripts = document.querySelectorAll('script[src][inline]');
    for (const script of scripts) {
        const src = withoutIEfix_1.default(script.getAttribute('src'));
        if (isUrl_1.default(src))
            continue;
        const filePath = path_1.default.isAbsolute(src)
            ? src
            : path_1.default.resolve(baseDir, src);
        const content = yield getContent_1.default(filePath);
        const newScript = document.createElement('script');
        newScript.appendChild(document.createTextNode(yield minifyJs_1.default(content)));
        document.head.appendChild(newScript);
        script.remove();
    }
    return dom;
});
