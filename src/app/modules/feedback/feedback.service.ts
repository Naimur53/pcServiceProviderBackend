import { Feedback } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const getAllFeedback = async (): Promise<Feedback[]> => {
  const result = await prisma.feedback.findMany({});
  return result;
};

const createFeedback = async (payload: Feedback): Promise<Feedback | null> => {
  const newFeedback = await prisma.feedback.create({
    data: payload,
  });
  return newFeedback;
};

const getSingleFeedback = async (id: string): Promise<Feedback | null> => {
  const result = await prisma.feedback.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateFeedback = async (
  id: string,
  payload: Partial<Feedback>
): Promise<Feedback | null> => {
  const result = await prisma.feedback.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteFeedback = async (id: string): Promise<Feedback | null> => {
  const result = await prisma.feedback.delete({
    where: { id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found!');
  }
  return result;
};

export const FeedbackService = {
  getAllFeedback,
  createFeedback,
  updateFeedback,
  getSingleFeedback,
  deleteFeedback,
};
