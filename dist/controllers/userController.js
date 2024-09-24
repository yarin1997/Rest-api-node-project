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
exports.deleteUser = exports.changeIsBusinessStatus = exports.editUser = exports.getUserBYId = exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_schema_1 = require("../validation/user-schema");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { error } = user_schema_1.registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const existingUser = yield User_1.default.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "The user already exists" });
    }
    console.log('Request body:', req.body);
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
        console.log("User Detail: " + user);
        yield user.save();
        res.status(201).json({ message: 'User registered' });
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
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const match = yield bcryptjs_1.default.compare(password, user.password);
        if (!match)
            return res.status(400).json({ message: 'Invalid password' });
        const token = jsonwebtoken_1.default.sign({ _id: user._id, email: email }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message });
    }
});
exports.loginUser = loginUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin) || !req.user)
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        const users = yield User_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
exports.getAllUsers = getAllUsers;
const getUserBYId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const userId = req.params.id;
        if (((_b = req.user) === null || _b === void 0 ? void 0 : _b.id) !== userId && !((_c = req.user) === null || _c === void 0 ? void 0 : _c.isAdmin)) {
            return res.status(500).json({ message: "No access" });
        }
        res.status(200).json(req.user);
    }
    catch (_d) {
        res.status(500).json({ message: "Some Error" });
    }
});
exports.getUserBYId = getUserBYId;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    console.log(userId);
    const { error } = user_schema_1.updateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const updateUser = yield User_1.default.findByIdAndUpdate(userId, req.body, { new: true });
        if (updateUser) {
            res.status(200).json({ message: "The user updated: " + updateUser });
        }
        else {
            res.status(404).json({ message: "Not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Some error: " + error });
    }
});
exports.editUser = editUser;
const changeIsBusinessStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    console.log(userId);
    if (!req.user)
        return res.status(404).json({ message: "User no found" });
    try {
        const updateUser = yield User_1.default.findByIdAndUpdate(userId, { isBusiness: !req.user.isBusiness }, { new: true });
        if (updateUser) {
            res.status(200).json({ message: " The user business status: " + updateUser.isBusiness });
        }
        else {
            res.status(404).json({ message: "Not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Some error: " + error });
    }
});
exports.changeIsBusinessStatus = changeIsBusinessStatus;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    console.log(userId);
    if (!req.user)
        return res.status(404).json({ message: "User no found" });
    try {
        const updateUser = yield User_1.default.findByIdAndDelete(userId, { new: true });
        if (updateUser) {
            res.status(200).json({ message: "The user has been deleted: " + updateUser.isBusiness });
        }
        else {
            res.status(404).json({ message: "Not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Some error: " + error });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map