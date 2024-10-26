import express from 'express';
// import projectController from '../controllers/projectController.js';
import * as projectController from '../controllers/projectController.js';

import * as auth from '../controllers/loginController.js';

import upload from '../controllers/multer.js';

const router = express.Router();

router.get('/', auth.authMiddleware, projectController.getProjects);
router.get('/:id', auth.authMiddleware, projectController.getProject);
router.post('/',
    auth.authMiddleware,
    upload.single('documentacion'),
    projectController.createProject
);
router.put('/:id', auth.authMiddleware, upload.single('documentacion'), projectController.updateProject);
router.delete('/:id', auth.authMiddleware, projectController.deleteProject);

export default router;
