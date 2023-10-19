import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get(
  '/',
  auth(UserRole.admin, UserRole.superAdmin),
  UserController.getAllUser
);
router.get(
  '/:id',
  auth(UserRole.admin, UserRole.superAdmin),
  UserController.getSingleUser
);

router.patch(
  '/:id',
  auth(UserRole.admin, UserRole.customer, UserRole.superAdmin),
  validateRequest(UserValidation.updateValidation),
  UserController.updateUser
);
router.delete(
  '/:id',
  auth(UserRole.admin, UserRole.superAdmin),
  UserController.deleteUser
);

export const UserRoutes = router;
