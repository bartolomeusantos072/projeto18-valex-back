import { Request, Response } from 'express';
import { rechargeService } from '../services/rechargeService';

export async function rechargeCardController (req: Request, res: Response) {
    
    const xApiKey:string|any = req.headers['x-api-key']?.toString();
    const { cardId, amount } : { cardId: number, amount: number } = req.body;
    
    await rechargeService.cardRecharge(xApiKey, cardId, amount);

    res.sendStatus(200);

}