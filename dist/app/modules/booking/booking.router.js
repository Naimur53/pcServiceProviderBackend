"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_controller_1 = require("./booking.controller");
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(client_1.UserRole.admin, client_1.UserRole.superAdmin), booking_controller_1.BookingController.getAllBooking);
router.get('/:id', (0, auth_1.default)(client_1.UserRole.customer, client_1.UserRole.admin), booking_controller_1.BookingController.getSingleBooking);
router.get('/singleUserAllBooking/:userId', (0, auth_1.default)(client_1.UserRole.customer), booking_controller_1.BookingController.getSingleUserAllBooking);
router.post('/', (0, auth_1.default)(client_1.UserRole.customer), (0, validateRequest_1.default)(booking_validation_1.BookingValidation.createValidation), booking_controller_1.BookingController.createBooking);
router.patch('/:id', (0, auth_1.default)(client_1.UserRole.customer, client_1.UserRole.admin), (0, validateRequest_1.default)(booking_validation_1.BookingValidation.updateValidation), booking_controller_1.BookingController.updateBooking);
router.delete('/:id', (0, auth_1.default)(client_1.UserRole.customer, client_1.UserRole.admin, client_1.UserRole.superAdmin), booking_controller_1.BookingController.deleteBooking);
exports.BookingRoutes = router;