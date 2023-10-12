import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FaqController } from './faq.controller';
import { FaqValidation } from './faq.validation';
const router = express.Router();

router.get('/', FaqController.getAllFaq);
router.get('/:id', auth(UserRole.admin), FaqController.getSingleFaq);

router.post(
  '/',
  auth(UserRole.admin),
  validateRequest(FaqValidation.createValidation),
  FaqController.createFaq
);

router.patch(
  '/:id',
  auth(UserRole.admin),
  validateRequest(FaqValidation.updateValidation),
  FaqController.updateFaq
);
router.delete('/:id', auth(UserRole.admin), FaqController.deleteFaq);

export const FaqRoutes = router;
