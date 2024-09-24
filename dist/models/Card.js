"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardSchema = exports.imageSchema = exports.addressSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const generateBizNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
};
exports.addressSchema = new mongoose_1.Schema({
    state: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: String, required: true },
    zip: { type: String, required: true },
});
exports.imageSchema = new mongoose_1.Schema({
    url: { type: String, required: true },
    alt: { type: String, required: true }
});
exports.cardSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    web: { type: String, required: true },
    image: { type: exports.imageSchema, required: false },
    address: { type: exports.addressSchema, required: true },
    likes: {
        type: [mongoose_1.Schema.Types.ObjectId],
        default: []
    }, user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }, bizNumber: {
        type: Number,
        default: generateBizNumber,
        unique: true,
    }
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Cards', exports.cardSchema);
//# sourceMappingURL=Card.js.map