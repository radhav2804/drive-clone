import {Router} from 'express';
import authRoutes from './auth.routes';
import folderRoutes from './folder.routes';
import fileRoutes from './file.routes';


const router = Router();
router.use('/auth', authRoutes);
router.use('/folders', folderRoutes);
router.use('/files', fileRoutes);

export default router;