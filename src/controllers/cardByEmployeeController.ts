import { Response, Request } from 'express';
import  {cardService} from "../services/cardService";

export async function activationCardByEmployeeController(req:Request, res:Response) {
   
    const { cardId, securityCode, password } : { cardId: number, securityCode: string, password: string} = req.body;

   const cardActivation = await cardService.activationCardByEmployee(cardId, securityCode, password);

    res.sendStatus(200).send(cardActivation);
    
}

export async function lockEmployeeCardEmployeeController (req: Request, res: Response) {
    
    const { cardId, password } : { cardId: number, password: string } = req.body;

    await cardService.lockEmployeeCardEmployee(cardId, password);

    res.sendStatus(200);

}

export async function unlockEmployeeCardEmployeeController (req: Request, res: Response) {

    const { cardId, password } : { cardId: number, password: string } = req.body;

    await cardService.unlockEmployeeCardEmployee(cardId, password);

    res.sendStatus(200);

}
