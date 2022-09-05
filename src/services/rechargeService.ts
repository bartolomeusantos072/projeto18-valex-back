import * as rechargeRepository from '../repositories/rechargeRepository';
import * as cardRepository from '../repositories/cardRepository';
import * as companyRepository from '../repositories/companyRepository';
import { cardService } from './cardService';
 

async function cardRecharge (key: string, cardId: number, amount: number) {

    const company = await companyRepository.findByApiKey(key);

    if (!company) {
        throw {
            type: 'not_found',
            message: 'Company not found'
        };
    }
  

    const card = await cardRepository.findById(cardId);

    if (!card) {
        throw {
            type: 'not_found',
            message: 'Card not found'
        };
    }
  


    if (!card.password) {
        throw {
            type: 'conflict',
            message: 'Card: not activated'
        };
    }
    cardService.checkExpiredCard(card.expirationDate);

    const rechargeInfo = { cardId, amount };
    await rechargeRepository.insert(rechargeInfo);

}

export const rechargeService = {

    cardRecharge

}
