import { Faq } from '@prisma/client';
        import { Request, Response } from 'express';
        import { RequestHandler } from 'express-serve-static-core';
        import httpStatus from 'http-status';
        import { paginationFields } from '../../../constants/pagination';
        import catchAsync from '../../../shared/catchAsync';
        import pick from '../../../shared/pick';
        import sendResponse from '../../../shared/sendResponse';
        import { FaqService } from './faq.service';
        import { faqFilterAbleFields } from './faq.constant';
        const createFaq: RequestHandler = catchAsync(
          async (req: Request, res: Response) => {
            const FaqData = req.body;
        
            const result = await FaqService.createFaq(
              FaqData
            );
            sendResponse<Faq>(res, {
              statusCode: httpStatus.OK,
              success: true,
              message: 'Faq Created successfully!',
              data: result,
            });
          }
        );
        
        const getAllFaq = catchAsync(
          async (req: Request, res: Response) => {
            const filters = pick(req.query, [
              'searchTerm',
              ...faqFilterAbleFields,
            ]);
            const paginationOptions = pick(req.query, paginationFields);
        
            const result = await FaqService.getAllFaq(
              filters,
              paginationOptions
            );
        
            sendResponse<Faq[]>(res, {
              statusCode: httpStatus.OK,
              success: true,
              message: 'Faq retrieved successfully !',
              meta: result.meta,
              data: result.data,
            });
          }
        );
        
        const getSingleFaq: RequestHandler = catchAsync(
          async (req: Request, res: Response) => {
            const id = req.params.id;
        
            const result = await FaqService.getSingleFaq(id);
        
            sendResponse<Faq>(res, {
              statusCode: httpStatus.OK,
              success: true,
              message: 'Faq retrieved  successfully!',
              data: result,
            });
          }
        );
        
        const updateFaq: RequestHandler = catchAsync(
          async (req: Request, res: Response) => {
            const id = req.params.id;
            const updateAbleData = req.body;
        
            const result = await FaqService.updateFaq(
              id,
              updateAbleData
            );
        
            sendResponse<Faq>(res, {
              statusCode: httpStatus.OK,
              success: true,
              message: 'Faq Updated successfully!',
              data: result,
            });
          }
        );
        const deleteFaq: RequestHandler = catchAsync(
          async (req: Request, res: Response) => {
            const id = req.params.id;
        
            const result = await FaqService.deleteFaq(id);
        
            sendResponse<Faq>(res, {
              statusCode: httpStatus.OK,
              success: true,
              message: 'Faq deleted successfully!',
              data: result,
            });
          }
        );
        
        export const FaqController = {
          getAllFaq,
          createFaq,
          updateFaq,
          getSingleFaq,
          deleteFaq,
        };