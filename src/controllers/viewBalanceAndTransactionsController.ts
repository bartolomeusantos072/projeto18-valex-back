import { Response, Request } from 'express';
import  {cardService} from "../services/cardService";


export async function viewBalanceAndTransactionsController (req: Request, res: Response) {
    
    const { cardId } : { cardId: number } = req.body;
    const info = await cardService.viewBalanceAndTransactions(cardId);

    res.send(info);

}