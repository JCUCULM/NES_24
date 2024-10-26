import express from 'express';
// import usuarioController from '../controllers/userController.js';
import * as usuarioController from '../controllers/userController.js';
import * as auth from '../controllers/loginController.js';

const router = express.Router();

router.get('/',auth.authMiddleware, usuarioController.getUsuarios);
router.get('/:id',auth.authMiddleware, usuarioController.getUser);
router.post('/',auth.authMiddleware, usuarioController.createUsuario);
router.put('/:id',auth.authMiddleware, usuarioController.updateUsuario);
router.put('/changepass/:id',auth.authMiddleware, usuarioController.updatePassUsuario);
router.delete('/:id',auth.authMiddleware, usuarioController.deleteUsuario);

export default router;
