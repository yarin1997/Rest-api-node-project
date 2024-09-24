"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/users', userController_1.registerUser);
router.post('/users/login', userController_1.loginUser);
router.get('/users', authMiddleware_1.authMiddleware, userController_1.getAllUsers);
router.get('/users/:id', authMiddleware_1.authGetUserById, userController_1.getUserBYId);
router.put('/users/:id', authMiddleware_1.authUpdating, userController_1.editUser);
router.patch('/users/:id', authMiddleware_1.authUpdating, userController_1.changeIsBusinessStatus);
router.delete('/users/:id', authMiddleware_1.authDeleting, userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map