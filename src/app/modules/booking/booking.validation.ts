import { BookingStatus } from '@prisma/client';
import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    userId: z.string({ required_error: 'userId is required' }),
    pcServiceId: z.string({ required_error: 'serviceId is required' }),
    address: z.string({ required_error: 'address is required' }),
    scheduleDate: z.string({ required_error: 'scheduleDate is required' }),
    status: z
      .enum([...Object.values(BookingStatus)] as [string, ...string[]], {
        required_error: 'status is required',
      })
      .default(BookingStatus.PENDING),
  }),
});
const updateValidation = z.object({
  body: z.object({
    userId: z.string({ required_error: 'userId is required' }).optional(),
    pcServiceId: z
      .string({ required_error: 'serviceId is required' })
      .optional(),
    address: z.string({ required_error: 'address is required' }).optional(),
    scheduleDate: z
      .string({ required_error: 'scheduleDate is required' })
      .optional(),
    adjustedSchedule: z
      .string({ required_error: 'adjustedSchedule is required' })
      .optional(),
    status: z
      .enum([...Object.values(BookingStatus)] as [string, ...string[]], {
        required_error: 'status is required',
      })
      .optional(),
  }),
});
export const BookingValidation = {
  createValidation,
  updateValidation,
};
