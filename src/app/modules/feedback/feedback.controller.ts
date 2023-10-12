import { Feedback } from '@prisma/client';
import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FeedbackService } from './feedback.service';
const createFeedback: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const FeedbackData = req.body;
    const user = req.user;
    const result = await FeedbackService.createFeedback({
      ...FeedbackData,
      userId: user?.userId,
    });
    sendResponse<Feedback>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback Created successfully!',
      data: result,
    });
  }
);

const getAllFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackService.getAllFeedback();
  sendResponse<Feedback[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback retrieved successfully !',
    data: result,
  });
});

const getSingleFeedback: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await FeedbackService.getSingleFeedback(id);

    sendResponse<Feedback>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback retrieved  successfully!',
      data: result,
    });
  }
);

const updateFeedback: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateAbleData = req.body;

    const result = await FeedbackService.updateFeedback(id, updateAbleData);

    sendResponse<Feedback>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback Updated successfully!',
      data: result,
    });
  }
);
const deleteFeedback: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await FeedbackService.deleteFeedback(id);

    sendResponse<Feedback>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback deleted successfully!',
      data: result,
    });
  }
);

export const FeedbackController = {
  getAllFeedback,
  createFeedback,
  updateFeedback,
  getSingleFeedback,
  deleteFeedback,
};
