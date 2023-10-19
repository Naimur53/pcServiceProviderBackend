"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartValidation = void 0;
const zod_1 = require("zod");
const createValidation = zod_1.z.object({
    body: zod_1.z.object({
        pcServiceId: zod_1.z.string({ required_error: 'pcServiceId is required' }),
    }),
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({
        pcServiceId: zod_1.z.string({ required_error: 'pcServiceId is required' }),
    }),
});
exports.CartValidation = {
    createValidation,
    updateValidation,
};
