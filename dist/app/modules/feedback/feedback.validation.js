"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackValidation = void 0;
const zod_1 = require("zod");
const createValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'title is required' }),
        comment: zod_1.z.string({ required_error: 'comment is required' }),
    }),
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'title is required' }).optional(),
        comment: zod_1.z.string({ required_error: 'comment is required' }).optional(),
    }),
});
exports.FeedbackValidation = {
    createValidation,
    updateValidation,
};
