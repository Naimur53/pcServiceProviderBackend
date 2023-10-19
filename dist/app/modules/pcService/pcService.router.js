"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PcServiceRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const pcService_controller_1 = require("./pcService.controller");
const pcService_validation_1 = require("./pcService.validation");
const router = express_1.default.Router();
router.get('/', pcService_controller_1.PcServiceController.getAllPcService);
router.get('/:id', (0, auth_1.default)(client_1.UserRole.admin, client_1.UserRole.superAdmin, client_1.UserRole.customer), pcService_controller_1.PcServiceController.getSinglePcService);
router.post('/', (0, auth_1.default)(client_1.UserRole.admin, client_1.UserRole.superAdmin), (0, validateRequest_1.default)(pcService_validation_1.PcServiceValidation.createValidation), pcService_controller_1.PcServiceController.createPcService);
router.patch('/:id', (0, auth_1.default)(client_1.UserRole.admin, client_1.UserRole.superAdmin), (0, validateRequest_1.default)(pcService_validation_1.PcServiceValidation.updateValidation), pcService_controller_1.PcServiceController.updatePcService);
router.delete('/:id', (0, auth_1.default)(client_1.UserRole.admin, client_1.UserRole.superAdmin), pcService_controller_1.PcServiceController.deletePcService);
exports.PcServiceRoutes = router;
