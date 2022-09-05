import { Router } from 'express';
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { paymentController } from '../controllers/paymentController';
import paymentSchema from '../schemas/paymentSchema';

const paymentRouter = Router();

paymentRouter.post('/payment', validateSchemaMiddleware(paymentSchema), paymentController);

export default paymentRouter;