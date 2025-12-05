import {Router} from 'express';
import {FolderController} from '../controllers/folder.controller';
import {requireAuth} from '../middlewares/auth.middlewares';


const router = Router();
router.get("/" ,requireAuth, FolderController.getContents);
router.post("/", requireAuth , FolderController.createFolder);
router.patch("/:id" ,  requireAuth , FolderController.rename);
router.delete("/:id" , requireAuth , FolderController.delete);

export default router;