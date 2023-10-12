import { BlogRoutes } from '../modules/blog/blog.router';
import { BookingRoutes } from '../modules/booking/booking.router';
import { FaqRoutes } from '../modules/faq/faq.router';
import { PcServiceRoutes } from '../modules/pcService/pcService.router';
import { ReviewRoutes } from '../modules/review/review.router';

import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ProfileRoutes } from '../modules/profile/profile.router';
import { UserRoutes } from '../modules/user/user.router';
const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },

  {
    path: '/pcService',
    route: PcServiceRoutes,
  },

  {
    path: '/review',
    route: ReviewRoutes,
  },

  {
    path: '/booking',
    route: BookingRoutes,
  },

  {
    path: '/faq',
    route: FaqRoutes,
  },

  {
    path: '/blog',
    route: BlogRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
