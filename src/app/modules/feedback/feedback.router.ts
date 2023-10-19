import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FeedbackController } from './feedback.controller';
import { FeedbackValidation } from './feedback.validation';
const router = express.Router();

router.get('/', FeedbackController.getAllFeedback);
router.get(
  '/:id',
  auth(UserRole.admin, UserRole.superAdmin),
  FeedbackController.getSingleFeedback
);

router.post(
  '/',
  auth(UserRole.customer),
  validateRequest(FeedbackValidation.createValidation),
  FeedbackController.createFeedback
);

router.patch(
  '/:id',
  auth(UserRole.admin, UserRole.superAdmin),
  validateRequest(FeedbackValidation.updateValidation),
  FeedbackController.updateFeedback
);
router.delete(
  '/:id',
  auth(UserRole.admin, UserRole.superAdmin),
  FeedbackController.deleteFeedback
);

export const FeedbackRoutes = router;
