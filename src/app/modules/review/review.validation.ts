import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    pcServiceId: z.string({ required_error: 'pcServiceId is required' }),
    rating: z.number({ required_error: 'rating is required' }).min(0).max(5),
    comment: z.string({ required_error: 'comment is required' }),
  }),
});
const updateValidation = z.object({
  body: z.object({
    pcServiceId: z
      .string({ required_error: 'pcServiceId is required' })
      .optional(),
    rating: z
      .number({ required_error: 'rating is required' })
      .min(0)
      .max(5)
      .optional(),
    comment: z.string({ required_error: 'comment is required' }).optional(),
  }),
});
export const ReviewValidation = {
  createValidation,
  updateValidation,
};
