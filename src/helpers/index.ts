import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';
import prisma from '../shared/prisma';

export const userAndPcServiceChecker = async (
  userId: string,
  pcServiceId: string
) => {
  console.log({ userId, pcServiceId });
  if (!userId || !pcServiceId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'userId or pcServiceId not found'
    );
  }
  const isUserExist = await prisma.user.findUnique({
    where: { id: userId },
  });
  const isServiceExist = await prisma.pcService.findUnique({
    where: { id: pcServiceId },
  });

  if (!isServiceExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'pcService notFound not found');
  }
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
};
