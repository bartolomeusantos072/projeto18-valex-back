import { Router } from 'express';
import { rechargeCardController } from '../controllers/rechargeCardController';
import {validateApiKeyMiddleware} from '../middlewares/validateApiKeyMiddleware'; 
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";

import rechargeSchema from '../schemas/rechargeSchema';

const rechargeRouter = Router();

rechargeRouter.post('/recharge', validateApiKeyMiddleware, validateSchemaMiddleware(rechargeSchema), rechargeCardController);

export default rechargeRouter;