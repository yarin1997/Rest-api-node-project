"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCard = exports.likeCard = exports.editCard = exports.getMyCards = exports.getCardById = exports.getAllCards = exports.createNewCard = void 0;
const card_schema_1 = require("../validation/card-schema");
const dotenv_1 = __importDefault(require("dotenv"));
const Card_1 = __importDefault(require("../models/Card"));
dotenv_1.default.config();
const createNewCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.body);
    const { error } = card_schema_1.cardSchema.validate(req.body);
    if (error)
        return res.status(400).json({ message: `Validation error: ${error.details[0].message}` });
    const newCard = Object.assign(Object.assign({}, req.body), { user_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
    try {
        const card = new Card_1.default(newCard);
        yield card.save();
        res.status(201).json({ message: 'Card created' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.createNewCard = createNewCard;
const getAllCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cards = yield Card_1.default.find();
        return res.status(200).json({
            message: "The user list:",
            cards: JSON.stringify(cards, null, 2)
        });
    }
    catch (_b) {
        return res.status(500).json({ message: " Some issue cause your request failure" });
    }
});
exports.getAllCards = getAllCards;
const getCardById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cardId = req.params.id;
    console.log(cardId);
    try {
        const card = yield Card_1.default.findById(cardId);
        if (!card)
            return res.status(401).json({ message: `The card dosen't exist by the given ID` });
        return res.status(200).json({ message: `The card: ${card}` });
    }
    catch (_c) {
        return res.status(500).json({ message: "Some issue" });
    }
});
exports.getCardById = getCardById;
const getMyCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d._id;
    if (!userId)
        return res.status(401).json({ message: "The id hasn't found" });
    try {
        const myCard = yield Card_1.default.find({ user_id: userId });
        if (myCard.length === 0) {
            return res.status(404).json({ message: "No cards found for the given user ID." });
        }
        return res.status(200).json({
            message: "Cards found for the given user ID.",
            cards: myCard
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "An error occurred while retrieving the cards."
        });
    }
});
exports.getMyCards = getMyCards;
const editCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const { error } = card_schema_1.cardSchemaUpdate.validate(req.body);
    if (error)
        return res.status(400).json({ messsage: "The cahnges are not valid" });
    const cardId = req.params.id;
    try {
        const card = yield Card_1.default.findById(cardId);
        if (!card)
            return res.status(401).json({ message: "The card isn't exist" });
        const cardUserId = card.user_id;
        if (cardUserId.toString().trim() !== ((_e = req.user) === null || _e === void 0 ? void 0 : _e._id).toString().trim())
            return res.status(401).json({ message: "You cant edit card that belong to another users" });
        const updateCard = yield Card_1.default.findByIdAndUpdate(cardId, req.body, { new: true });
        console.log(updateCard);
        if (updateCard)
            return res.status(200).json({ message: "the card is updated successfuly", card: updateCard });
    }
    catch (error) {
        res.status(500).json({ message: "Some error: " + error });
    }
});
exports.editCard = editCard;
const likeCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const cardId = req.params.id;
    try {
        const card = yield Card_1.default.findById(cardId);
        if (!card)
            return res.status(400).json({ message: "card isn't exist" });
        const likesArray = card.likes;
        const userId = (_f = req.user) === null || _f === void 0 ? void 0 : _f._id;
        if (likesArray.includes(userId)) {
            card.likes = likesArray.filter(id => id.toString().trim() !== userId.toString().trim());
        }
        else {
            card.likes.push(userId);
        }
        yield Card_1.default.findByIdAndUpdate(cardId, { likes: card.likes }, { new: true });
        return res.status(200).json({ message: "the arrayLikes updated successfuly", likes: card.likes });
    }
    catch (error) {
        return res.status(500).json({ message: "Some error" });
    }
});
exports.likeCard = likeCard;
const deleteCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    const cardId = req.params.id;
    try {
        const card = yield Card_1.default.findById(cardId);
        if (!card)
            return res.status(400).json({ message: "card isn't exist" });
        const cardCreatorId = card.user_id;
        if ((cardCreatorId.toString().trim() !== ((_g = req.user) === null || _g === void 0 ? void 0 : _g._id).toString().trim()) && !((_h = req.user) === null || _h === void 0 ? void 0 : _h.isAdmin)) {
            return res.status(401).json({ message: " You havn't the auth to delete" });
        }
        else {
            yield Card_1.default.findByIdAndDelete(cardId);
            return res.status(200).json({ message: "Deleted successfully : ", card });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Some Error: " + error });
    }
});
exports.deleteCard = deleteCard;
//# sourceMappingURL=cardController.js.map