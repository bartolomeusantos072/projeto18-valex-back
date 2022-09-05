import * as cardRepository from '../repositories/cardRepository';
import * as companyRepository from "../repositories/companyRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import * as paymentRepository from "../repositories/paymentRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";
import { TransactionTypes } from '../repositories/cardRepository';

import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import bcrypt from 'bcrypt';
import Cryptr from "cryptr";



async function createCard(xApiKey: any, employeeId: number, cardType: TransactionTypes) {

    // - A chave de API deve pertencer a alguma empresa
    const company = await companyRepository.findByApiKey(xApiKey);
    if (!company) {
        throw { type: 'not_found', message: 'Company not found' };
    }

    // - Somente empregados cadastrados podem ter cartões
    const registeredEmployeeInCompany = await employeeRepository.findByEmployeeOnCompany(employeeId, company.id);

    if (!registeredEmployeeInCompany) {
        throw {
            type: 'not_found',
            message: 'Employee not found'
        };
    }

    // - Empregados não podem ter mais de um cartão do mesmo tipo
    const existsEmployeeCardType = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId);
    if (existsEmployeeCardType.length > 0) {
        throw {
            type: 'unauthorized',
            message: 'Card type: already exists'
        };
    }

    // - Utilize a biblioteca [faker](https://fakerjs.dev/guide/#overview) para gerar o número do cartão
    let createNumberForCard = faker.random.numeric(16).match(/.{1,4}/g)?.join("");

    const cryptr = new Cryptr('encrypted code');
    const cvc = faker.random.numeric(3);
    const newCard: cardRepository.CardInsertData = {

        employeeId: employeeId,
        number: createNumberForCard,
        cardholderName: cardholderName(registeredEmployeeInCompany.fullName),
        securityCode: cryptr.encrypt(cvc),
        expirationDate: dayjs().add(5, "year").format("MM/YY"),
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: true,
        type: cardType,

    };
    
    await cardRepository.insert(newCard)

    return {
        message: 'successfully created card'
    }
}



async function activationCardByEmployee(cardId: number, securityCode: string, password: string) {
    
    // - Somente cartões cadastrados devem ser ativados
    const card = await cardRepository.findById(cardId);
    if (!card) {
        throw {
            type: 'not_found',
            message: 'Card not found'
        };
    }
  
    // - Somente cartões não expirados devem ser ativados
     const date = checkExpiredCard(card.expirationDate);
    
    // - Cartões já ativados (com senha cadastrada) não devem poder ser ativados de novo
    if (card.password) {
        throw {
            type: 'conflict',
            message: 'Card: activated'
        };
    }
  
    
    // - O CVC deverá ser recebido e verificado para garantir a segurança da requisição
    const cryptr = new Cryptr('encrypted code');
    
    if (securityCode !== cryptr.decrypt(card.securityCode)) {
        throw {
            type: 'unauthorized',
            message: 'Access: unauthorized'
        };
    }
    
    // - A senha do cartão deverá ser composta de 4 números
    
    const passwordHash = bcrypt.hashSync(password, 10);
    
    // - A senha do cartão deverá ser persistida de forma criptografado por ser um dado sensível
    const dataUpdate = { password: passwordHash };
   
    await cardRepository.update(card.id, dataUpdate);
    
    return { message: 'activation successful' }

}


async function viewBalanceAndTransactions(cardId:number){

    const card = await cardRepository.findById(cardId);

    if (!card) {
        throw {
            type: 'not_found',
            message: 'Card not found'
        };
    }

    const payments = await paymentRepository.findByCardId(cardId);
    const recharges = await rechargeRepository.findByCardId(cardId);
    const balance = cardBalance(payments, recharges);
  
    return { balance, transactions: payments, recharges };
}



async function lockEmployeeCardEmployee(cardId:number,password: string) {
    const card = await cardRepository.findById(cardId);

    if (!card) {
        throw {
            type: 'not_found',
            message: 'Card not found'
        };
    }

    checkExpiredCard(card.expirationDate);
    if (card.isBlocked === false) {
        throw {
            type: 'conflict',
            message: 'Card: unlocked'
        };
    }
    if (!bcrypt.compareSync(password, card.password)) {
        throw {
            type: 'unauthorized',
            message: 'Access: unauthorized'
        };
    }
  
    await cardRepository.update(cardId, { isBlocked: true });

    return;
}

async function unlockEmployeeCardEmployee(cardId:number,password: string){
    const card = await cardRepository.findById(cardId);
    if (!card) {
        throw {
            type: 'not_found',
            message: 'Card not found'
        };
    }
    checkExpiredCard(card.expirationDate);
    if (card.isBlocked === false) {
        throw {
            type: 'conflict',
            message: 'Card: unlocked'
        };
    }
   
    if (!bcrypt.compareSync(password, card.password)) {
        throw {
            type: 'unauthorized',
            message: 'Access: unauthorized'
        };
    }
    await cardRepository.update(cardId, { isBlocked: false });

    return;
}

function checkExpiredCard(dateExpiration:string){
 
    const monthExpiration: number = parseInt(dateExpiration.split('/')[0]);
    const yearExpiration: number = parseInt(dateExpiration.split('/')[1])+2000;
    if(dayjs().year() > yearExpiration || dayjs().year() === yearExpiration && dayjs().month() + 1 > monthExpiration){
        throw {
            type: 'unauthorized',
            message: 'Card: expired'
        };
    }
    return;

}

function cardBalance(payments:any[],recharges:any[]){
    let paymentsTotal: number = 0;
    payments.map((payment) => (paymentsTotal += payment.amount));
  
    let totalRecharges: number = 0;
    recharges.map((recharge) => (totalRecharges += recharge.amount));
  
    const balance = totalRecharges - paymentsTotal;

    return balance;
}


function cardholderName(nameEmployee: string) {

    const fullName: string[] = nameEmployee.split(" ");
    const firstName: string = fullName[0] + " ";
    const lastName: string = fullName[fullName.length - 1];
    let middleName: string = "";

    // - Considere nomes do meio apenas nomes que possuírem 3 letras ou mais
    if (fullName.length > 2) {
        for (let i = 1; i < fullName.length - 1; i++) {

            if (fullName[i].length >= 3) {
                middleName += fullName[i][0] + " ";
            }
        }
    }

    return (firstName + middleName + lastName).toUpperCase();

}



export const cardService = {

    createCard,
    activationCardByEmployee,
    viewBalanceAndTransactions,
    lockEmployeeCardEmployee,
    unlockEmployeeCardEmployee,
    checkExpiredCard,
    cardBalance

}