"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slash = void 0;
exports.slash = (path) => {
    const isExtendedLengthPath = /^\\\\\?\\/.test(path);
    if (isExtendedLengthPath) {
        return path;
    }
    return path.replace(/\\/g, `/`);
};
