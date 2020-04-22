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
const fs_1 = require("fs");
const jsdom_1 = require("jsdom");
const inlineStylesheets_1 = __importDefault(require("./processors/inlineStylesheets"));
const inlineScripts_1 = __importDefault(require("./processors/inlineScripts"));
const minifyHtml_1 = __importDefault(require("./minifiers/minifyHtml"));
const getContent_1 = __importDefault(require("./utils/getContent"));
const inlineImages_1 = __importDefault(require("./processors/inlineImages"));
const defaultOptions = {
    isCLI: false,
    maxInlinableFilesize: 8
};
exports.default = (entry, output, options = defaultOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const entryPath = path_1.default.resolve(process.cwd(), entry);
    const baseDir = path_1.default.dirname(entryPath);
    const { isCLI } = options;
    const html = yield getContent_1.default(entryPath);
    /*
      dom serializing is slow - every processor works on the same DOM object
      */
    const dom = new jsdom_1.JSDOM(html);
    isCLI && console.log(`Starting processing entry file...`);
    const withInlinedStylesheets = yield inlineStylesheets_1.default(dom, baseDir, options);
    isCLI && console.log(`CSS inlined and minified!`);
    const withInlinedScripts = yield inlineScripts_1.default(withInlinedStylesheets, baseDir);
    isCLI && console.log(`JS inlined and minified!`);
    const withInlinedImages = yield inlineImages_1.default(withInlinedScripts, baseDir, options);
    isCLI && console.log(`Images inlined, SVG minified!`);
    const withMinifiedHtml = yield minifyHtml_1.default(withInlinedImages.serialize());
    isCLI && console.log(`HTML minified!`);
    if (isCLI) {
        const outputPath = path_1.default.resolve(process.cwd(), output);
        yield fs_1.promises.writeFile(outputPath, withMinifiedHtml);
        console.log(`Done.`);
        console.log(`Output saved at "${outputPath}"`);
    }
    return withMinifiedHtml;
});
