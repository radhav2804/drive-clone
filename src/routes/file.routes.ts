import { FileController } from "../controllers/file.controller";
import multer from "multer";
import { requireAuth, AuthRequest } from "../middlewares/auth.middlewares";
import {Router} from "express"; 
import { getStorage } from "../config/multer";

const router = Router();

router.post(
    "/upload",
    requireAuth,
    (req: AuthRequest, res, next) => {
        const userId = req.user!.id;
        // Get folderId from query params instead of body for now
        const folderId = Number(req.query.folderId) || 0;
        console.log("Folder id insife routes: " , folderId);
        const upload = multer({ storage: getStorage(userId, folderId) });
        upload.single('file')(req, res, next);
    },
    FileController.upload
);

router.get("/:id/download", requireAuth , FileController.download);
router.delete("/:id", requireAuth , FileController.delete);

export default router;