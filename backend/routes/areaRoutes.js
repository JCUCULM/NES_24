import express from 'express';
import areaController from '../controllers/areaController.js';
import * as auth from '../controllers/loginController.js';
const router = express.Router();

router.get('/',auth.authMiddleware, areaController.getAll);
router.get('/:id',auth.authMiddleware, areaController.getArea);
router.post('/', auth.authMiddleware,areaController.create);
router.put('/:id',auth.authMiddleware, areaController.update);
router.delete('/:id',auth.authMiddleware, areaController.delete);

export default router;
