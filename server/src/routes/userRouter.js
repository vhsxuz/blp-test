import Router from 'express';
import { registerUser, loginUser } from '../controller/userController.js';

const router = Router();

// Define user routes
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
