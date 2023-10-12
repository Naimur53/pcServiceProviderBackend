import { Faq, Prisma } from '@prisma/client';
        import httpStatus from 'http-status';
        import ApiError from '../../../errors/ApiError';
        import { paginationHelpers } from '../../../helpers/paginationHelper';
        import { IGenericResponse } from '../../../interfaces/common';
        import { IPaginationOptions } from '../../../interfaces/pagination';
        import prisma from '../../../shared/prisma';
        import { faqSearchableFields } from './faq.constant';
        import { IFaqFilters } from './faq.interface';
        
        const getAllFaq = async (
          filters: IFaqFilters,
          paginationOptions: IPaginationOptions
        ): Promise<IGenericResponse<Faq[]>> => {
          const { page, limit, skip } =
            paginationHelpers.calculatePagination(paginationOptions);
        
          const { searchTerm, ...filterData } = filters;
        
          const andCondition = [];
        
          if (searchTerm) {
            const searchAbleFields = faqSearchableFields.map(single => {
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
        
          const whereConditions: Prisma.FaqWhereInput =
            andCondition.length > 0 ? { AND: andCondition } : {};
        
          const result = await prisma.faq.findMany({
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
          });
          const total = await prisma.faq.count();
          const output = {
            data: result,
            meta: { page, limit, total },
          };
          return output;
        };
        
        const createFaq = async (
          payload: Faq
        ): Promise<Faq | null> => {
          const newFaq = await prisma.faq.create({
            data: payload,
          });
          return newFaq;
        };
        
        const getSingleFaq = async (
          id: string
        ): Promise<Faq | null> => {
          const result = await prisma.faq.findUnique({
            where: {
              id,
            },
          });
          return result;
        };
        
        const updateFaq = async (
          id: string,
          payload: Partial<Faq>
        ): Promise<Faq | null> => {
          const result = await prisma.faq.update({
            where: {
              id,
            },
            data: payload,
          });
          return result;
        };
        
        const deleteFaq = async (
          id: string
        ): Promise<Faq | null> => {
          const result = await prisma.faq.delete({
            where: { id },
          });
          if (!result) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Faq not found!');
          }
          return result;
        };
        
        export const FaqService = {
          getAllFaq,
          createFaq,
          updateFaq,
          getSingleFaq,
          deleteFaq,
        };