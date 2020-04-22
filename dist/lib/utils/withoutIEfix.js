"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const popped = (array) => {
    const _array = [...array];
    _array.pop();
    return _array;
};
//removes ?#iefix and #... from url
exports.default = (url) => {
    if (url.includes('?'))
        url = popped(url.split('?')).join('');
    if (url.includes('#'))
        url = popped(url.split('#')).join('');
    return url;
};
