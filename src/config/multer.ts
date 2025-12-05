import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const getStorage = (userId: number, folderId: number)=>{
    const uploadPath = path.join("storage", `user_${userId}`, `folder_${folderId}`);
    fs.mkdirSync(uploadPath, {recursive:true});
    return multer.diskStorage({
        destination:(_req , _file , cb) =>{
            cb(null, uploadPath);
        },
        filename : (_req, file , cb) => {
            const uniqueSuffix = Date.now()+'-'+ Math.round(Math.random()*1e9);
            const ext = path.extname(file.originalname);
            const baseName = path.basename(file.originalname ,ext);
            cb(null , `${baseName}-${uniqueSuffix}${ext}`);
        },
    });
};