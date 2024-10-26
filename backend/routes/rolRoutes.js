import express from 'express';
import rolController from '../controllers/rolController.js';
import * as auth from '../controllers/loginController.js';
const router = express.Router();

router.get('/',auth.authMiddleware, rolController.getAll);
// router.get('/:id', rolController.getArea);
router.post('/',auth.authMiddleware, rolController.create);
router.put('/:id',auth.authMiddleware, rolController.update);
router.delete('/:id',auth.authMiddleware, rolController.delete);

export default router;