import { Review } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { userAndPcServiceChecker } from '../../../helpers';
import prisma from '../../../shared/prisma';

const getAllReview = async (): Promise<Review[]> => {
  const result = await prisma.review.findMany({});
  return result;
};

const createReview = async (payload: Review): Promise<Review | null> => {
  await userAndPcServiceChecker(payload.userId, payload.pcServiceId);
  const newReview = await prisma.review.create({
    data: payload,
  });
  return newReview;
};

const getSingleReview = async (id: string): Promise<Review | null> => {
  const result = await prisma.review.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateReview = async (
  id: string,
  payload: Partial<Review>
): Promise<Review | null> => {
  const result = await prisma.review.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteReview = async (id: string): Promise<Review | null> => {
  const result = await prisma.review.delete({
    where: { id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found!');
  }
  return result;
};

export const ReviewService = {
  getAllReview,
  createReview,
  updateReview,
  getSingleReview,
  deleteReview,
};
