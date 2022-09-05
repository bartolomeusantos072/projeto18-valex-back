import joi from "joi";

const createCardsSchema = joi.object({
    employeeId:joi.number().required(),
    cardType: joi.string().allow("groceries", "restaurants", "transport", "education", "health").required()
})
export default createCardsSchema;