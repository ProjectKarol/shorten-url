import { Router } from 'express';
import { ConvertController } from '../../../controllers/Convert.controller';

const router = Router();

router.post('/url-to-deeplink', ConvertController.createDeepLink);
router.get('/deeplink-to-url', ConvertController.getDeepLink);

export default router;
