import { PcService } from '@prisma/client';
import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import {
  pcServiceFilterAbleFields,
  pcServiceFilterByPrice,
} from './pcService.constant';
import { PcServiceService } from './pcService.service';
const createPcService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const PcServiceData = req.body;

    const result = await PcServiceService.createPcService(PcServiceData);
    sendResponse<PcService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'PcService Created successfully!',
      data: result,
    });
  }
);

const getAllPcService = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, [
    'searchTerm',
    ...pcServiceFilterAbleFields,
    ...pcServiceFilterByPrice,
  ]);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await PcServiceService.getAllPcService(
    filters,
    paginationOptions
  );

  sendResponse<PcService[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PcService retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSinglePcService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await PcServiceService.getSinglePcService(id);

    sendResponse<PcService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'PcService retrieved  successfully!',
      data: result,
    });
  }
);

const updatePcService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateAbleData = req.body;

    const result = await PcServiceService.updatePcService(id, updateAbleData);

    sendResponse<PcService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'PcService Updated successfully!',
      data: result,
    });
  }
);
const deletePcService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await PcServiceService.deletePcService(id);

    sendResponse<PcService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'PcService deleted successfully!',
      data: result,
    });
  }
);
const allCategoryOfPcService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PcServiceService.allCategoryOfPcService();
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'successful!',
      data: result,
    });
  }
);
const overview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PcServiceService.overview();
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'successful!',
      data: result,
    });
  }
);

export const PcServiceController = {
  getAllPcService,
  createPcService,
  updatePcService,
  getSinglePcService,
  deletePcService,
  allCategoryOfPcService,
  overview,
};
