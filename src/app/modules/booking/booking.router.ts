import express from 'express';
        import validateRequest from '../../middlewares/validateRequest';
        import { BookingController } from './booking.controller';
        import { BookingValidation } from './booking.validation';
        const router = express.Router();
        
        router.get('/', BookingController.getAllBooking);
        router.get('/:id', BookingController.getSingleBooking);
        
        router.post(
          '/',
          validateRequest(BookingValidation.createValidation),
          BookingController.createBooking
        );
        
        router.patch(
          '/:id',
          validateRequest(BookingValidation.updateValidation),
          BookingController.updateBooking
        );
        router.delete('/:id', BookingController.deleteBooking);
        
        export const BookingRoutes = router;