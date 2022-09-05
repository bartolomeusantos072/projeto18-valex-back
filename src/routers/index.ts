import { Router } from 'express';
import cardsRouter from './cardsRouter';
import paymentRouter from './paymentRouter';
import rechargeRouter from './rechargeRouter';

const router = Router();

router.use(cardsRouter);
router.use(paymentRouter);
router.use(rechargeRouter);

export default router;