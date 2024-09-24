"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cardsAuth_1 = require("../middleware/cardsAuth");
const cardController_1 = require("../controllers/cardController");
const cardRouter = (0, express_1.Router)();
cardRouter.get('/cards', cardsAuth_1.authGetAllCards, cardController_1.getAllCards);
cardRouter.get('/cards/my-cards', cardsAuth_1.authGetMyCards, cardController_1.getMyCards);
cardRouter.get('/card/:id', cardsAuth_1.authGetCardById, cardController_1.getCardById);
cardRouter.post('/card', cardsAuth_1.authCreate, cardController_1.createNewCard);
cardRouter.put('/card/:id', cardsAuth_1.authEditCard, cardController_1.editCard);
cardRouter.patch('/card/:id', cardsAuth_1.authEditCard, cardController_1.likeCard);
cardRouter.delete('/card/:id', cardsAuth_1.authDeleteCard, cardController_1.deleteCard);
exports.default = cardRouter;
//# sourceMappingURL=cardRoutes.js.map