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
const isUrl_1 = __importDefault(require("../utils/isUrl"));
const getSize_1 = __importDefault(require("../utils/getSize"));
const asyncStringReplace_1 = __importDefault(require("../utils/asyncStringReplace"));
const getContentInBase64_1 = __importDefault(require("../utils/getContentInBase64"));
const withoutIEfix_1 = __importDefault(require("../utils/withoutIEfix"));
const getMinifiedSvgInBase64_1 = __importDefault(require("../utils/getMinifiedSvgInBase64"));
const getContent_1 = __importDefault(require("../utils/getContent"));
//do not match properties starting with src: and urls ending with format
//[ \t]* -> one or many spaces
const URL_PATTERN = /(?<!src:[ \t]*)(url\(\s*['"]?)([^"')]+)(["']?\s*\))(?! format)/g;
exports.default = (stylesheet, stylesheetDir, htmlDir, { maxInlinableFilesize }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield asyncStringReplace_1.default(stylesheet, URL_PATTERN, (matched, before, url, after) => __awaiter(void 0, void 0, void 0, function* () {
        if (isUrl_1.default(url))
            return matched;
        url = withoutIEfix_1.default(url);
        const absoluteUrl = path_1.default.isAbsolute(url)
            ? url
            : path_1.default.resolve(stylesheetDir, url);
        if ((yield getSize_1.default(absoluteUrl)) > maxInlinableFilesize) {
            /*
              /
                index.html
                /styles/
                  style.css:
                    div { background: url(../images/...); }
      
              makes to
      
              /
                index.html:
                  <style>
                  div { background: url(./images/...); }
                  </style>
            */
            const updatedRelativePath = path_1.default.relative(htmlDir, absoluteUrl);
            return `${before}${updatedRelativePath}${after}`;
        }
        if (path_1.default.extname(absoluteUrl) === '.svg')
            return `${before}${yield getMinifiedSvgInBase64_1.default(yield getContent_1.default(absoluteUrl))}${after}`;
        return `${before}${yield getContentInBase64_1.default(absoluteUrl)}${after}`;
    }));
});
