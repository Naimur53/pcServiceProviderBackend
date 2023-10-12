import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FeedbackController } from './feedback.controller';
import { FeedbackValidation } from './feedback.validation';
const router = express.Router();

router.get('/', auth(UserRole.admin), FeedbackController.getAllFeedback);
router.get('/:id', auth(UserRole.admin), FeedbackController.getSingleFeedback);

router.post(
  '/',
  auth(UserRole.admin),
  validateRequest(FeedbackValidation.createValidation),
  FeedbackController.createFeedback
);

router.patch(
  '/:id',
  auth(UserRole.admin),
  validateRequest(FeedbackValidation.updateValidation),
  FeedbackController.updateFeedback
);
router.delete('/:id', auth(UserRole.admin), FeedbackController.deleteFeedback);

export const FeedbackRoutes = router;
