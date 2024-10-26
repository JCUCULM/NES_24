import express from 'express';
import * as tareaController from '../controllers/tareaController.js';
import * as auth from '../controllers/loginController.js';
import upload from '../controllers/multer.js';
const router = express.Router();

router.get('/', auth.authMiddleware, tareaController.getTareas);
router.get('/:id', auth.authMiddleware, tareaController.getTarea);
router.post('/', auth.authMiddleware, upload.single('documentacion'), tareaController.createTarea);
// router.put('/:id', auth.authMiddleware, upload.single('documentacion'), tareaController.updateTarea);
router.put('/:id', auth.authMiddleware, upload.fields([
    { name: 'documentacion', maxCount: 1 },
    { name: 'fileprueba', maxCount: 1 }
  ]), tareaController.updateTarea);
router.delete('/:id', auth.authMiddleware, tareaController.deleteTarea);

//files
router.get('/file1/:id', tareaController.downloadfile);
router.get('/file2/:id', tareaController.downloadfile2);

export default router;
