"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: 'userId is required' }),
        pcServiceId: zod_1.z.string({ required_error: 'serviceId is required' }),
        address: zod_1.z.string({ required_error: 'address is required' }),
        scheduleDate: zod_1.z.string({ required_error: 'scheduleDate is required' }),
        status: zod_1.z
            .enum([...Object.values(client_1.BookingStatus)], {
            required_error: 'status is required',
        })
            .default(client_1.BookingStatus.PENDING),
    }),
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: 'userId is required' }).optional(),
        pcServiceId: zod_1.z
            .string({ required_error: 'serviceId is required' })
            .optional(),
        address: zod_1.z.string({ required_error: 'address is required' }).optional(),
        scheduleDate: zod_1.z
            .string({ required_error: 'scheduleDate is required' })
            .optional(),
        adjustedSchedule: zod_1.z
            .string({ required_error: 'adjustedSchedule is required' })
            .optional(),
        status: zod_1.z
            .enum([...Object.values(client_1.BookingStatus)], {
            required_error: 'status is required',
        })
            .optional(),
    }),
});
exports.BookingValidation = {
    createValidation,
    updateValidation,
};
