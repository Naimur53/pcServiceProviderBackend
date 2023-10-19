import { Cart } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { userAndPcServiceChecker } from '../../../helpers';
import prisma from '../../../shared/prisma';

const getAllCart = async (): Promise<Cart[]> => {
  const result = await prisma.cart.findMany({ where: {} });
  return result;
};
const createCart = async (payload: Cart): Promise<Cart | null> => {
  await userAndPcServiceChecker(payload.userId, payload.pcServiceId);

  // check does it already exits
  const isExits = await prisma.cart.findFirst({
    where: {
      pcServiceId: payload.pcServiceId,
    },
  });
  if (isExits) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cart Already exits');
  }
  const newCart = await prisma.cart.create({
    data: payload,
  });
  return newCart;
};

const getSingleCart = async (id: string): Promise<Cart | null> => {
  const result = await prisma.cart.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const getSingleUserAllCart = async (userId: string): Promise<Cart[] | null> => {
  const result = await prisma.cart.findMany({
    where: {
      userId: userId,
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
    },
  });
  return result;
};

const updateCart = async (
  id: string,
  payload: Partial<Cart>
): Promise<Cart | null> => {
  const result = await prisma.cart.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteCart = async (id: string): Promise<Cart | null> => {
  const result = await prisma.cart.delete({
    where: { id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found!');
  }
  return result;
};

export const CartService = {
  getAllCart,
  createCart,
  updateCart,
  getSingleCart,
  deleteCart,
  getSingleUserAllCart,
};
