"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const addressJoiSchema = joi_1.default.object({
    state: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    street: joi_1.default.string().required(),
    houseNumber: joi_1.default.string().required(),
    zip: joi_1.default.string().required(),
});
const imageJoiSchema = joi_1.default.object({
    url: joi_1.default.string().required(),
    alt: joi_1.default.string().required(),
});
exports.registerSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    name: joi_1.default.object({ first: joi_1.default.string().min(2).required(),
        middle: joi_1.default.string().min(2).optional(),
        last: joi_1.default.string().min(2).required()
    }).required(),
    adress: addressJoiSchema.required(),
    image: imageJoiSchema.optional(),
    phoneNumber: joi_1.default.string().optional(),
    isBusiness: joi_1.default.boolean().optional(),
    isAdmin: joi_1.default.boolean().optional(),
});
exports.updateSchema = joi_1.default.object({
    email: joi_1.default.string().email().optional(),
    password: joi_1.default.string().min(6).optional(),
    name: joi_1.default.object({
        first: joi_1.default.string().min(2).optional(),
        middle: joi_1.default.string().min(2).optional(),
        last: joi_1.default.string().min(2).optional()
    }).optional(),
    adress: addressJoiSchema.optional(),
    image: imageJoiSchema.optional(),
    phoneNumber: joi_1.default.string().optional(),
    isBusiness: joi_1.default.boolean().optional(),
    isAdmin: joi_1.default.boolean().optional(),
});
//# sourceMappingURL=user-schema.js.map