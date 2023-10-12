import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';
const router = express.Router();

router.get('/', auth(UserRole.admin), BookingController.getAllBooking);
router.get(
  '/:id',
  auth(UserRole.customer, UserRole.admin),
  BookingController.getSingleBooking
);
router.get(
  '/singleUserAllBooking/:userId',
  auth(UserRole.customer),
  BookingController.getSingleUserAllBooking
);

router.post(
  '/',
  auth(UserRole.customer),
  validateRequest(BookingValidation.createValidation),
  BookingController.createBooking
);

router.patch(
  '/:id',
  auth(UserRole.customer, UserRole.admin),
  validateRequest(BookingValidation.updateValidation),
  BookingController.updateBooking
);
router.delete(
  '/:id',
  auth(UserRole.customer, UserRole.admin),
  auth(UserRole.admin),
  BookingController.deleteBooking
);

export const BookingRoutes = router;
