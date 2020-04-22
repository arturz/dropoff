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
Object.defineProperty(exports, "__esModule", { value: true });
//source: https://dev.to/ycmjason/stringprototypereplace-asynchronously-28k9
exports.default = (str, regex, aReplacer) => __awaiter(void 0, void 0, void 0, function* () {
    const substrs = [];
    let match;
    let i = 0;
    while ((match = regex.exec(str)) !== null) {
        // put non matching string
        substrs.push(str.slice(i, match.index));
        // call the async replacer function with the matched array spreaded
        substrs.push(aReplacer(...match));
        i = regex.lastIndex;
    }
    // put the rest of str
    substrs.push(str.slice(i));
    // wait for aReplacer calls to finish and join them back into string
    return (yield Promise.all(substrs)).join('');
});
