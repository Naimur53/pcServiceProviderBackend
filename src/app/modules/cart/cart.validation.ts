import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    pcServiceId: z.string({ required_error: 'pcServiceId is required' }),
  }),
});
const updateValidation = z.object({
  body: z.object({
    pcServiceId: z.string({ required_error: 'pcServiceId is required' }),
  }),
});
export const CartValidation = {
  createValidation,
  updateValidation,
};
