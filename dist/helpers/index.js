"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAndPcServiceChecker = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const prisma_1 = __importDefault(require("../shared/prisma"));
const userAndPcServiceChecker = (userId, pcServiceId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ userId, pcServiceId });
    if (!userId || !pcServiceId) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'userId or pcServiceId not found');
    }
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: { id: userId },
    });
    const isServiceExist = yield prisma_1.default.pcService.findUnique({
        where: { id: pcServiceId },
    });
    if (!isServiceExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'pcService notFound not found');
    }
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
});
exports.userAndPcServiceChecker = userAndPcServiceChecker;
