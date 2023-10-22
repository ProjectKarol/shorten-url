"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequiredStringFormat = void 0;
const createRequiredStringFormat = (errorName) => (str) => {
    if (!str) {
        throw new Error(`${errorName} required`);
    }
};
exports.createRequiredStringFormat = createRequiredStringFormat;
