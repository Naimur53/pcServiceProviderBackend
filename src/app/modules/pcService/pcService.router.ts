import express from 'express';
        import validateRequest from '../../middlewares/validateRequest';
        import { PcServiceController } from './pcService.controller';
        import { PcServiceValidation } from './pcService.validation';
        const router = express.Router();
        
        router.get('/', PcServiceController.getAllPcService);
        router.get('/:id', PcServiceController.getSinglePcService);
        
        router.post(
          '/',
          validateRequest(PcServiceValidation.createValidation),
          PcServiceController.createPcService
        );
        
        router.patch(
          '/:id',
          validateRequest(PcServiceValidation.updateValidation),
          PcServiceController.updatePcService
        );
        router.delete('/:id', PcServiceController.deletePcService);
        
        export const PcServiceRoutes = router;