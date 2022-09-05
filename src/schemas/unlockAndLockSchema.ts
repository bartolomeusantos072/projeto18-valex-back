import Joi from 'joi';

const unlockAndLockSchema = Joi.object({

    cardId: Joi.number().required(),
    password: Joi.string().pattern(/\d{4}/).required()

});

export default unlockAndLockSchema;