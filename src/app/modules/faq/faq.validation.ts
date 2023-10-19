import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    question: z.string({ required_error: 'question is required' }),
    answer: z.string({ required_error: 'answer is required' }),
  }),
});
const updateValidation = z.object({
  body: z.object({
    question: z.string({ required_error: 'question is required' }).optional(),
    answer: z.string({ required_error: 'answer is required' }).optional(),
  }),
});
export const FaqValidation = {
  createValidation,
  updateValidation,
};
