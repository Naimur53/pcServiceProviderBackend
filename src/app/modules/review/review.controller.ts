import { Review } from '@prisma/client';
import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReviewService } from './review.service';
const createReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const ReviewData = req.body;
    const user = req.user;
    const result = await ReviewService.createReview({
      ...ReviewData,
      userId: user?.userId,
    });
    sendResponse<Review>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review Created successfully!',
      data: result,
    });
  }
);

const getAllReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getAllReview();

  sendResponse<Review[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrieved successfully !',
    data: result,
  });
});

const getSingleReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await ReviewService.getSingleReview(id);

    sendResponse<Review>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review retrieved  successfully!',
      data: result,
    });
  }
);

const updateReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateAbleData = req.body;

    const result = await ReviewService.updateReview(id, updateAbleData);

    sendResponse<Review>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review Updated successfully!',
      data: result,
    });
  }
);
const deleteReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await ReviewService.deleteReview(id);

    sendResponse<Review>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review deleted successfully!',
      data: result,
    });
  }
);

export const ReviewController = {
  getAllReview,
  createReview,
  updateReview,
  getSingleReview,
  deleteReview,
};
