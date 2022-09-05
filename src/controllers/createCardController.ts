import { Response, Request } from 'express';
import { TransactionTypes } from '../repositories/cardRepository';
import  {cardService} from "../services/cardService";

export async function createCardController(req:Request, res:Response) {
   
    const xApiKey = req.headers['x-api-key']?.toString();
    
    const { employeeId, cardType } : { employeeId: number, cardType: TransactionTypes } = req.body
    const createCardForEmployee = await cardService.createCard(xApiKey, employeeId, cardType);

    res.status(201).send(createCardForEmployee);
    
}