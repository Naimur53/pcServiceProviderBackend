import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';
const router = express.Router();

router.get('/', BlogController.getAllBlog);
router.get('/:id', BlogController.getSingleBlog);

router.post(
  '/',
  auth(UserRole.admin, UserRole.superAdmin),
  validateRequest(BlogValidation.createValidation),
  BlogController.createBlog
);

router.patch(
  '/:id',
  auth(UserRole.admin, UserRole.superAdmin),
  validateRequest(BlogValidation.updateValidation),
  BlogController.updateBlog
);
router.delete(
  '/:id',
  auth(UserRole.admin, UserRole.superAdmin),
  BlogController.deleteBlog
);

export const BlogRoutes = router;
