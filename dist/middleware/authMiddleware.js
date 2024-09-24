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
exports.authDeleting = exports.authUpdating = exports.authGetUserById = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('Authorization');
    if (!token)
        return res.status(401).json({ message: 'No token provided' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'default_secret');
        const user = yield User_1.default.findById(decoded._id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});
exports.authMiddleware = authMiddleware;
const authGetUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('Authorization');
    if (!token)
        return res.status(401).json({ message: 'No token provided' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'default_secret');
        const user = yield User_1.default.findById(decoded._id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});
exports.authGetUserById = authGetUserById;
const authUpdating = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('Authorization');
    console.log("TOKEN:" + token);
    if (!token)
        return res.status(401).json({ message: 'No token provided' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'default_secret');
        const user = yield User_1.default.findById(decoded._id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        if (decoded._id !== req.params.id.toString()) {
            return res.status(403).json("You dont have auth to update this user");
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});
exports.authUpdating = authUpdating;
const authDeleting = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('Authorization');
    console.log("TOKEN:" + token);
    if (!token)
        return res.status(401).json({ message: 'No token provided' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'default_secret');
        const user = yield User_1.default.findById(decoded._id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        if (decoded._id !== req.params.id && !user.isAdmin) {
            return res.status(403).json("You dont have auth to delete this user");
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});
exports.authDeleting = authDeleting;
//# sourceMappingURL=authMiddleware.js.map