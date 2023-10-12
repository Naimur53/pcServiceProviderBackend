import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CartController } from './cart.controller';
import { CartValidation } from './cart.validation';
const router = express.Router();

router.get('/', auth(UserRole.admin), CartController.getAllCart);
router.get(
  '/:id',
  auth(UserRole.customer, UserRole.admin),
  CartController.getSingleCart
);
router.get(
  '/singleUserAllCart/:userId',
  auth(UserRole.admin, UserRole.customer),
  CartController.getSingleUserAllCart
);

router.post(
  '/',
  auth(UserRole.customer),
  validateRequest(CartValidation.createValidation),
  CartController.createCart
);

router.patch(
  '/:id',
  validateRequest(CartValidation.updateValidation),
  CartController.updateCart
);
router.delete('/:id', CartController.deleteCart);

export const CartRoutes = router;
