
import * as paymentRepository from '../repositories/paymentRepository';
import * as rechargeRepository from '../repositories/rechargeRepository';
import * as businessRepository from '../repositories/businessRepository';
import * as cardRepository from '../repositories/cardRepository';
import { cardService } from './cardService';
import bcrypt from 'bcrypt';

async function payment (cardId: number, password: string, businessId: number, amount: number) {
    const card = await cardRepository.findById(cardId);

    if (!card) {
        throw {
            type: 'not_found',
            message: 'Card not found'
        };
    }
    
    if (password!==card.password) {
        throw {
            type: 'conflict',
            message: 'Card: not activated'
        };
    }
    cardService.checkExpiredCard(card.expirationDate);

    if (card.isBlocked === true) {
        throw {
            type: 'conflict',
            message: 'Card: blocked'
        };
    }
  
    if (!bcrypt.compareSync(password, card.password)) {
        throw {
            type: 'unauthorized',
            message: 'Access: unauthorized'
        };
    }
    
    const business = await businessRepository.findById(businessId);

    if (!business) {
        throw {
            type: 'not_found',
            message: 'Business not found'
        };
    }

    if (card.type !== business.type) {
        throw {
            type: 'unauthorized',
            message: 'No type match'
        };
    }
    
    const payments = await paymentRepository.findByCardId(cardId);
    const recharges = await rechargeRepository.findByCardId(cardId);
    const balance = cardService.cardBalance(payments, recharges);
    if (balance < amount) {
        throw {
            type: 'unauthorized',
            message: 'Balance: not enough'
        };
    }
    const paymentData = { cardId, businessId, amount };
    await paymentRepository.insert(paymentData);
    return;

}

export const paymentService = {

    payment

};
