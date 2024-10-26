import express from 'express';
import cargoController from '../controllers/cargoController.js';
import * as auth from '../controllers/loginController.js';

const router = express.Router();

router.get('/', auth.authMiddleware, cargoController.getAll);
router.get('/:id', auth.authMiddleware, cargoController.getCargo);
router.post('/', auth.authMiddleware, cargoController.create);
router.put('/:id', auth.authMiddleware, cargoController.update);
router.delete('/:id', auth.authMiddleware, cargoController.delete);

export default router;