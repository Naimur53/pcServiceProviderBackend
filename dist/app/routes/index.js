"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_router_1 = require("../modules/blog/blog.router");
const booking_router_1 = require("../modules/booking/booking.router");
const faq_router_1 = require("../modules/faq/faq.router");
const pcService_router_1 = require("../modules/pcService/pcService.router");
const review_router_1 = require("../modules/review/review.router");
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const cart_router_1 = require("../modules/cart/cart.router");
const feedback_router_1 = require("../modules/feedback/feedback.router");
const fileUpload_route_1 = require("../modules/fileUpload/fileUpload.route");
const profile_router_1 = require("../modules/profile/profile.router");
const user_router_1 = require("../modules/user/user.router");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_router_1.UserRoutes,
    },
    {
        path: '/profile',
        route: profile_router_1.ProfileRoutes,
    },
    {
        path: '/pcService',
        route: pcService_router_1.PcServiceRoutes,
    },
    {
        path: '/review',
        route: review_router_1.ReviewRoutes,
    },
    {
        path: '/booking',
        route: booking_router_1.BookingRoutes,
    },
    {
        path: '/faq',
        route: faq_router_1.FaqRoutes,
    },
    {
        path: '/blog',
        route: blog_router_1.BlogRoutes,
    },
    {
        path: '/cart',
        route: cart_router_1.CartRoutes,
    },
    {
        path: '/feedback',
        route: feedback_router_1.FeedbackRoutes,
    },
    {
        path: '/uploadImg',
        route: fileUpload_route_1.fileUploadRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
