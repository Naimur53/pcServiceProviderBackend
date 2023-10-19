"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PcServiceValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'name is required' }),
        description: zod_1.z.string({ required_error: 'description is required' }),
        price: zod_1.z.number({ required_error: 'price is required' }),
        thumbnail: zod_1.z.string({ required_error: 'thumbnails is required' }),
        category: zod_1.z.enum([...Object.values(client_1.ServiceCategory)], { required_error: 'category is required' }),
        availability: zod_1.z.enum([...Object.values(client_1.ServiceAvailability)], { required_error: 'availability is required' }),
        location: zod_1.z.enum([...Object.values(client_1.ServiceLocation)], { required_error: 'location is required' }),
    }),
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'name is required' }).optional(),
        description: zod_1.z
            .string({ required_error: 'description is required' })
            .optional(),
        price: zod_1.z.number({ required_error: 'price is required' }).optional(),
        thumbnail: zod_1.z
            .string({ required_error: 'thumbnails is required' })
            .optional(),
        category: zod_1.z
            .enum([...Object.values(client_1.ServiceCategory)], {
            required_error: 'category is required',
        })
            .optional(),
        availability: zod_1.z
            .enum([...Object.values(client_1.ServiceAvailability)], {
            required_error: 'availability is required',
        })
            .optional(),
        location: zod_1.z
            .enum([...Object.values(client_1.ServiceLocation)], {
            required_error: 'location is required',
        })
            .optional(),
    }),
});
exports.PcServiceValidation = {
    createValidation,
    updateValidation,
};
