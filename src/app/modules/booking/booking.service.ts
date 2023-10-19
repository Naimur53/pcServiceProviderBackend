import { Booking, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { userAndPcServiceChecker } from '../../../helpers';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { bookingSearchableFields } from './booking.constant';
import { IBookingFilters } from './booking.interface';

const getAllBooking = async (
  filters: IBookingFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Booking[]>> => {
  console.log(paginationOptions);
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filterData } = filters;

  const andCondition = [];

  if (searchTerm) {
    const searchAbleFields = bookingSearchableFields.map(single => {
      const query = {
        [single]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      };
      return query;
    });
    andCondition.push({
      OR: searchAbleFields,
    });
  }
  if (Object.keys(filters).length) {
    andCondition.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.BookingWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.booking.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? {
            [paginationOptions.sortBy]: paginationOptions.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
    include: {
      pcService: {
        select: {
          name: true,
          location: true,
          price: true,
          thumbnail: true,
          id: true,
          category: true,
        },
      },
      user: {
        select: {
          email: true,
          name: true,
          profileImg: true,
          address: true,
          id: true,
        },
      },
    },
  });
  const total = await prisma.booking.count();
  const output = {
    data: result,
    meta: { page, limit, total },
  };
  return output;
};

const createBooking = async (payload: Booking): Promise<Booking | null> => {
  await userAndPcServiceChecker(payload.userId, payload.pcServiceId);

  const result = await prisma.$transaction(async tx => {
    const removeAllCartForThisUser = await tx.cart.deleteMany({
      where: {
        userId: payload.userId,
        pcServiceId: payload.pcServiceId,
      },
    });
    return await tx.booking.create({
      data: payload,
    });
  });
  return result;
};

const getSingleBooking = async (id: string): Promise<Booking | null> => {
  const result = await prisma.booking.findUnique({
    where: {
      id,
    },
  });
  if (!result?.id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data Not found');
  }
  return result;
};
const getSingleUserAllBooking = async (
  userId: string
): Promise<Booking[] | null> => {
  const result = await prisma.booking.findMany({
    where: {
      userId,
    },
    include: {
      pcService: {
        select: {
          name: true,
          price: true,
          thumbnail: true,
        },
      },
    },
  });
  return result;
};

const updateBooking = async (
  id: string,
  payload: Partial<Booking>
): Promise<Booking | null> => {
  const result = await prisma.booking.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteBooking = async (id: string): Promise<Booking | null> => {
  const result = await prisma.booking.delete({
    where: { id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found!');
  }
  return result;
};

export const BookingService = {
  getAllBooking,
  createBooking,
  updateBooking,
  getSingleBooking,
  getSingleUserAllBooking,
  deleteBooking,
};
