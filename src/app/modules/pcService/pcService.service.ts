import { PcService, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { pcServiceSearchableFields } from './pcService.constant';
import { IPcServiceFilters } from './pcService.interface';

const getAllPcService = async (
  filters: IPcServiceFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<PcService[]>> => {
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, maxPrice, minPrice, ...filterData } = filters;

  const andCondition = [];

  if (searchTerm) {
    const searchAbleFields = pcServiceSearchableFields.map(single => {
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
  if (maxPrice) {
    andCondition.push({
      price: {
        lte: Number(maxPrice),
      },
    });
  }
  if (minPrice) {
    andCondition.push({
      price: {
        gte: Number(minPrice),
      },
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

  const whereConditions: Prisma.PcServiceWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.pcService.findMany({
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
      reviews: {
        select: {
          rating: true,
        },
      },
    },
  });
  const total = await prisma.pcService.count();
  const output = {
    data: result,
    meta: { page, limit, total },
  };
  return output;
};

const createPcService = async (
  payload: PcService
): Promise<PcService | null> => {
  const newPcService = await prisma.pcService.create({
    data: payload,
  });
  return newPcService;
};

const getSinglePcService = async (id: string): Promise<PcService | null> => {
  const result = await prisma.pcService.findUnique({
    where: {
      id,
    },
    include: {
      reviews: {
        select: {
          comment: true,
          rating: true,
          userId: true,
          id: true,
          user: true,
        },
      },
    },
  });
  return result;
};

const updatePcService = async (
  id: string,
  payload: Partial<PcService>
): Promise<PcService | null> => {
  const result = await prisma.pcService.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deletePcService = async (id: string): Promise<PcService | null> => {
  const result = await prisma.pcService.delete({
    where: { id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'PcService not found!');
  }
  return result;
};
const allCategoryOfPcService = async (): Promise<any> => {
  const result = await prisma.pcService.groupBy({
    by: ['category'],
    _count: {
      _all: true,
    },
    _min: {
      price: true,
      thumbnail: true,
    },
    take: 9,
    orderBy: {
      category: 'asc',
    },
  });
  return result;
};
const overview = async (): Promise<any> => {
  /**
    step 1: order number only->
            pending order,
            confirm order,
            cancel order,
    step 2: category order status
            show all category orders info like one category has been order 4 time,
    step 3: user activity on order 
            total user,
            total reviews, 
            total feed back,
            total added cart items
    step 4: cart activity overview,
            show cart activity of users with graph cart like,  
   */

  // step 1
  const bookingStatusP = prisma.booking.groupBy({
    by: ['status'],
    _count: true,
  });

  // step 2
  const categoryStatusP = prisma.$queryRaw`SELECT "pcServiceId", "name", COUNT(*)::integer as count FROM (
    SELECT "pcServiceId", "name", "userId" FROM "PcService" INNER JOIN "Booking" ON "PcService".id = "Booking"."pcServiceId"
  ) as SubqueryAlias GROUP BY "pcServiceId", "name"`;

  // step 3
  const totalUserP = prisma.user.count();
  const totalFeedbackP = prisma.feedback.count();
  const totalReviewsP = prisma.review.count();
  const totalCartsP = prisma.cart.count();
  // step 4
  const totalBlogP = prisma.blog.count();
  const totalFaqP = prisma.faq.count();
  const totalServiceP = prisma.pcService.count();

  const [
    bookingStatus,
    categoryStatus,
    totalUser,
    totalFeedback,
    totalReviews,
    totalCarts,
    totalBlog,
    totalFaq,
    totalService,
  ] = await Promise.all([
    bookingStatusP,
    categoryStatusP,
    totalUserP,
    totalFeedbackP,
    totalReviewsP,
    totalCartsP,
    totalBlogP,
    totalFaqP,
    totalServiceP,
  ]);
  return {
    bookingStatus,
    categoryStatus,
    totalUser,
    totalFeedback,
    totalReviews,
    totalCarts,
    totalBlog,
    totalFaq,
    totalService,
  };
};

export const PcServiceService = {
  getAllPcService,
  createPcService,
  updatePcService,
  getSinglePcService,
  deletePcService,
  allCategoryOfPcService,
  overview,
};
