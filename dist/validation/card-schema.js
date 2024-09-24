"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardSchemaUpdate = exports.imageSchemaUpdate = exports.addressSchemaUpdate = exports.cardSchema = exports.imageSchema = exports.addressSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const phoneRegex = /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;
// Define the Joi schema for the address
exports.addressSchema = joi_1.default.object({
    state: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    street: joi_1.default.string().required(),
    houseNumber: joi_1.default.string().required(),
    zip: joi_1.default.string().required()
});
// Define the Joi schema for the image
exports.imageSchema = joi_1.default.object({
    url: joi_1.default.string().uri().required(),
    alt: joi_1.default.string().required()
});
// Define the Joi schema for the card
exports.cardSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    subtitle: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    phone: joi_1.default.string().required().regex(phoneRegex),
    email: joi_1.default.string().email().required().regex(emailRegex),
    web: joi_1.default.string().uri().required(),
    image: exports.imageSchema.required(),
    address: exports.addressSchema.required(),
});
exports.addressSchemaUpdate = joi_1.default.object({
    state: joi_1.default.string().optional(),
    country: joi_1.default.string().optional(),
    city: joi_1.default.string().optional(),
    street: joi_1.default.string().optional(),
    houseNumber: joi_1.default.string().optional(),
    zip: joi_1.default.string().optional()
});
// Define the Joi schema for the image (for updating, fields are optional)
exports.imageSchemaUpdate = joi_1.default.object({
    url: joi_1.default.string().uri().optional(),
    alt: joi_1.default.string().optional()
});
// Define the Joi schema for updating the card (fields are optional)
exports.cardSchemaUpdate = joi_1.default.object({
    title: joi_1.default.string().optional(),
    subtitle: joi_1.default.string().optional(),
    description: joi_1.default.string().optional(),
    phone: joi_1.default.string().optional().regex(phoneRegex),
    email: joi_1.default.string().email().optional().regex(emailRegex),
    web: joi_1.default.string().uri().optional(),
    image: exports.imageSchemaUpdate.optional(),
    address: exports.addressSchemaUpdate.optional()
});
//# sourceMappingURL=card-schema.js.map