import {
  ServiceAvailability,
  ServiceCategory,
  ServiceLocation,
} from '@prisma/client';
import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    description: z.string({ required_error: 'description is required' }),
    price: z.number({ required_error: 'price is required' }),
    thumbnail: z.string({ required_error: 'thumbnails is required' }),
    category: z.enum(
      [...Object.values(ServiceCategory)] as [string, ...string[]],
      { required_error: 'category is required' }
    ),
    availability: z.enum(
      [...Object.values(ServiceAvailability)] as [string, ...string[]],
      { required_error: 'availability is required' }
    ),
    location: z.enum(
      [...Object.values(ServiceLocation)] as [string, ...string[]],
      { required_error: 'location is required' }
    ),
  }),
});
const updateValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }).optional(),
    description: z
      .string({ required_error: 'description is required' })
      .optional(),
    price: z.number({ required_error: 'price is required' }).optional(),
    thumbnail: z
      .string({ required_error: 'thumbnails is required' })
      .optional(),
    category: z
      .enum([...Object.values(ServiceCategory)] as [string, ...string[]], {
        required_error: 'category is required',
      })
      .optional(),
    availability: z
      .enum([...Object.values(ServiceAvailability)] as [string, ...string[]], {
        required_error: 'availability is required',
      })
      .optional(),
    location: z
      .enum([...Object.values(ServiceLocation)] as [string, ...string[]], {
        required_error: 'location is required',
      })
      .optional(),
  }),
});
export const PcServiceValidation = {
  createValidation,
  updateValidation,
};
