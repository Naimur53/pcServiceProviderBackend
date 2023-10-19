"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const createValidation = zod_1.z.object({
    body: zod_1.z.object({
        pcServiceId: zod_1.z.string({ required_error: 'pcServiceId is required' }),
        rating: zod_1.z.number({ required_error: 'rating is required' }).min(0).max(5),
        comment: zod_1.z.string({ required_error: 'comment is required' }),
    }),
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({
        pcServiceId: zod_1.z
            .string({ required_error: 'pcServiceId is required' })
            .optional(),
        rating: zod_1.z
            .number({ required_error: 'rating is required' })
            .min(0)
            .max(5)
            .optional(),
        comment: zod_1.z.string({ required_error: 'comment is required' }).optional(),
    }),
});
exports.ReviewValidation = {
    createValidation,
    updateValidation,
};
