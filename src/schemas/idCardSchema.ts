import joi from 'joi';

const idCardSchema = joi.object({

    cardId: joi.number().required(),
});
export default idCardSchema;