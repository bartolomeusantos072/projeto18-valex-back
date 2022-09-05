import { Router } from "express";
import { validateApiKeyMiddleware } from "../middlewares/validateApiKeyMiddleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { createCardController } from "../controllers/createCardController";
import { activationCardByEmployeeController, lockEmployeeCardEmployeeController, unlockEmployeeCardEmployeeController } from "../controllers/cardByEmployeeController";
import { viewBalanceAndTransactionsController } from "../controllers/viewBalanceAndTransactionsController";

import createCardsSchema from "../schemas/createCardsSchema";
import activationCardsSchema from '../schemas/activationCardsSchema';
import idCardSchema from '../schemas/idCardSchema';
import unlockAndLockSchema from "../schemas/unlockAndLockSchema";

const cardsRouter = Router();

cardsRouter.post("/create-card", validateApiKeyMiddleware, validateSchemaMiddleware(createCardsSchema), createCardController);

cardsRouter.post("/activation-card", validateSchemaMiddleware(activationCardsSchema), activationCardByEmployeeController)

cardsRouter.get('/transactions-card', validateSchemaMiddleware(idCardSchema), viewBalanceAndTransactionsController);

cardsRouter.post('/lock-card', validateSchemaMiddleware(unlockAndLockSchema), lockEmployeeCardEmployeeController);

cardsRouter.post('/unlock-card', validateSchemaMiddleware(unlockAndLockSchema), unlockEmployeeCardEmployeeController);


export default cardsRouter;