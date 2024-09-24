import { Router } from 'express';
import { registerUser, loginUser,getAllUsers, getUserBYId,editUser, changeIsBusinessStatus, deleteUser} from '../controllers/userController'
import { authMiddleware, authUpdating, authDeleting, authGetUserById } from '../middleware/authMiddleware';
 const router = Router();

 router.post('/users', registerUser);
 router.post('/users/login', loginUser);
 router.get('/users',  authMiddleware, getAllUsers);
 router.get('/users/:id', authGetUserById, getUserBYId);
 router.put('/users/:id', authUpdating, editUser)
 router.patch('/users/:id', authUpdating ,changeIsBusinessStatus);
 router.delete('/users/:id', authDeleting ,deleteUser);

 export default router;