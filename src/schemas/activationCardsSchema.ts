import joi from 'joi';

const cardActivationSchema = joi.object({

    cardId: joi.number().required(),
    securityCode: joi.string().regex(/^\d{3}$/).required(),
    password: joi.string().length(4).required()

});

export default cardActivationSchema;