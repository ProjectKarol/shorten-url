import { Router } from 'express';
import { ConvertController } from '../../../controllers/Convert.controller';

const router = Router();

router.post('/url-to-deeplink', ConvertController.create);

export default router;
