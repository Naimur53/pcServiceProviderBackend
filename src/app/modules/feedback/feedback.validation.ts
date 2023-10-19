import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required' }),
    comment: z.string({ required_error: 'comment is required' }),
  }),
});
const updateValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required' }).optional(),
    comment: z.string({ required_error: 'comment is required' }).optional(),
  }),
});
export const FeedbackValidation = {
  createValidation,
  updateValidation,
};
