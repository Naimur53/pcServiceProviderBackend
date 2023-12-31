import { Prisma, User } from '@prisma/client';
import createBycryptPassword from '../../../helpers/createBycryptPassword';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { userSearchableFields } from './user.constant';
import { IUserFilters } from './user.interface';

const getAllUser = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Omit<User, 'password'>[]>> => {
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filterData } = filters;

  const andCondition = [];

  if (searchTerm) {
    const searchAbleFields = userSearchableFields.map(single => {
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

  const whereConditions: Prisma.UserWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  console.log({ page, limit, skip }, whereConditions);
  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,

    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? {
            [paginationOptions.sortBy]: paginationOptions.sortOrder,
          }
        : {
            id: 'desc',
          },
    select: {
      address: true,
      contactNo: true,
      email: true,
      id: true,
      name: true,
      profileImg: true,
      role: true,
      isBlocked: true,
    },
  });
  const total = await prisma.user.count();
  const output = {
    data: result,
    meta: { page, limit, total },
  };
  return output;
};

const createUser = async (payload: Omit<User, 'id'>): Promise<User | null> => {
  const newUser = await prisma.user.create({
    data: payload,
  });
  return newUser;
};

const getSingleUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const { password, ...rest } = payload;
  let genarateBycryptPass;
  if (password) {
    genarateBycryptPass = await createBycryptPassword(password);
  }
  console.log(rest);
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: genarateBycryptPass
      ? { ...rest, password: genarateBycryptPass }
      : rest,
  });
  return result;
};

const deleteUser = async (id: string): Promise<User | null> => {
  return await prisma.$transaction(async tx => {
    // Inside the transaction, perform your database operations
    const deleteAllCart = await tx.cart.deleteMany({ where: { userId: id } });
    const deleteAllBooking = await tx.booking.deleteMany({
      where: { userId: id },
    });
    const deleteAllReview = await tx.review.deleteMany({
      where: { userId: id },
    });
    const deleteAllFeedBack = await tx.feedback.deleteMany({
      where: { userId: id },
    });
    const deleteUser = await tx.user.delete({ where: { id } });

    return deleteUser;
  });
};

export const UserService = {
  getAllUser,
  createUser,
  updateUser,
  getSingleUser,
  deleteUser,
};
