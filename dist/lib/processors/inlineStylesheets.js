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
const minifyCss_1 = __importDefault(require("../minifiers/minifyCss"));
const updatePathsInStylesheet_1 = __importDefault(require("./updatePathsInStylesheet"));
const withoutIEfix_1 = __importDefault(require("../utils/withoutIEfix"));
const isUrl_1 = __importDefault(require("../utils/isUrl"));
exports.default = (dom, baseDir, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { window: { document } } = dom;
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"][href][inline]');
    for (const stylesheet of stylesheets) {
        const href = withoutIEfix_1.default(stylesheet.getAttribute('href'));
        if (isUrl_1.default(href))
            continue;
        const filePath = path_1.default.isAbsolute(href)
            ? href
            : path_1.default.resolve(baseDir, href);
        const content = yield minifyCss_1.default(yield getContent_1.default(filePath));
        //Makes paths in url() relative to HTML and inlines url() if it is possible
        const contentWithUpdatedPaths = yield updatePathsInStylesheet_1.default(content, path_1.default.dirname(filePath), baseDir, options);
        const styleElement = document.createElement('style');
        styleElement.appendChild(document.createTextNode(contentWithUpdatedPaths));
        document.head.appendChild(styleElement);
        stylesheet.remove();
    }
    return dom;
});
