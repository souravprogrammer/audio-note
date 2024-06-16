import express from 'express';
import { AuthByProviders } from '../controller/auth.controller';
const router = express.Router();
router.post('/', AuthByProviders);

export default router;
