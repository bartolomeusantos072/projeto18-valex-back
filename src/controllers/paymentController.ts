import { Request, Response } from 'express';
import { paymentService } from '../services/paymentService';

export async function paymentController (req: Request, res: Response) {
  
    const { cardId, password, businessId, amount } : { cardId: number, password: string, businessId: number, amount: number } = req.body;

    await paymentService.payment(cardId, password, businessId, amount);
    
    res.sendStatus(201);

}
