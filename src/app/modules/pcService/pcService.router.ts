import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PcServiceController } from './pcService.controller';
import { PcServiceValidation } from './pcService.validation';
const router = express.Router();

router.get('/', PcServiceController.getAllPcService);

router.get(
  '/allCategoryOfPcService',
  PcServiceController.allCategoryOfPcService
);
router.get(
  '/:id',
  auth(UserRole.admin, UserRole.superAdmin, UserRole.customer),
  PcServiceController.getSinglePcService
);
router.post(
  '/',
  auth(UserRole.admin, UserRole.superAdmin),
  validateRequest(PcServiceValidation.createValidation),
  PcServiceController.createPcService
);

router.patch(
  '/:id',
  auth(UserRole.admin, UserRole.superAdmin),
  validateRequest(PcServiceValidation.updateValidation),
  PcServiceController.updatePcService
);
router.delete(
  '/:id',
  auth(UserRole.admin, UserRole.superAdmin),
  PcServiceController.deletePcService
);
router.get(
  '/dashboard/overview',
  // auth(UserRole.admin, UserRole.superAdmin),
  PcServiceController.overview
);

export const PcServiceRoutes = router;
