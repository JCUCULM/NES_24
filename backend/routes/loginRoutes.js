import express from 'express';
import * as loginController from '../controllers/loginController.js';


const router = express.Router();
router.post('/', loginController.authlogin);
router.get('/role',loginController.authMiddleware, loginController.permiso);
// router.get('/logout', logout);

export default router;
