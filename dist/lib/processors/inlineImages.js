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
const withoutIEfix_1 = __importDefault(require("../utils/withoutIEfix"));
const getContentInBase64_1 = __importDefault(require("../utils/getContentInBase64"));
const getSize_1 = __importDefault(require("../utils/getSize"));
const getContent_1 = __importDefault(require("../utils/getContent"));
const getMinifiedSvgInBase64_1 = __importDefault(require("../utils/getMinifiedSvgInBase64"));
const isUrl_1 = __importDefault(require("../utils/isUrl"));
exports.default = (dom, baseDir, { maxInlinableFilesize }) => __awaiter(void 0, void 0, void 0, function* () {
    const { window: { document } } = dom;
    const images = document.querySelectorAll('img[src][inline]');
    for (const img of images) {
        const src = withoutIEfix_1.default(img.getAttribute('src'));
        if (isUrl_1.default(src))
            continue;
        const filePath = path_1.default.isAbsolute(src)
            ? src
            : path_1.default.resolve(baseDir, src);
        //don't inline files bigger than maxInlinableFilesize
        if ((yield getSize_1.default(filePath)) > maxInlinableFilesize)
            continue;
        if (path_1.default.extname(filePath) === '.svg')
            img.setAttribute('src', yield getMinifiedSvgInBase64_1.default(yield getContent_1.default(filePath)));
        else
            img.setAttribute('src', yield getContentInBase64_1.default(filePath));
        img.removeAttribute('inline');
    }
    return dom;
});
