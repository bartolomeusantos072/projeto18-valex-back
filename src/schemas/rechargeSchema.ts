import joi from 'joi';

const rechargeSchema = joi.object({

    cardId: joi.number().required(),
    amount: joi.number().greater(0).required()

});

export default rechargeSchema;
