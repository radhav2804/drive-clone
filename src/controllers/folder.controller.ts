import {Response} from 'express';
import {FolderService} from '../services/folder.services';
import {AuthRequest} from '../middlewares/auth.middlewares';
import { createFolderSchema, renameFolderSchema } from '../schemes/folder.schema';

export class FolderController{
    static async getContents(req:AuthRequest, res:Response){
        try{
            console.log("Reaching : ", req);
         const userId = req.user!.id;
         const folderIdParam = req.query.folderId as string | undefined;
         const folderId = folderIdParam ? Number(folderIdParam): undefined;

         const result = await FolderService.getFolderContents(userId, folderId);
         return res.status(200).json({
            message:"Folder contents fetched successfully",
            data: result,
         });
        } catch(err : any){
            return res.status(400).json({
                message:err.message || "Failed to fetch folder contents"
            });
        }
    }

    static async createFolder(req:AuthRequest , res:Response){
        try{
            const userId = req.user!.id;
            const parsed = createFolderSchema.parse(req.body);

            const folder = await FolderService.createFolder(
                userId , parsed.name , parsed.parentId                
            );

            return res.status(201).json({
                message:"Folder created successfully",
                data : folder,
            });
        } catch(err : any){
            if(err?.name === "ZodError"){
                return res.status(400).json({message:"Validation errors" ,errors: err.errors});
            }
            return res.status(400).json({
                message: err.message || "Failed to create folder"
            });
        }
    }

    static async rename(req:AuthRequest, res:Response){
        try{

            console.log("===== RENAME DEBUG =====");
            console.log("Request body:", req.body);
            console.log("Request params:", req.params);
            console.log("User:", req.user);
        
            const userId = req.user!.id;
            const folderId = Number(req.params.id);

            console.log("Parsed userId:", userId);
            console.log("Parsed folderId:", folderId);
            const parsed = renameFolderSchema.parse(req.body);

            const updated  = await FolderService.renameFolder(
                userId , folderId, parsed.name
            );
            return res.status(200).json({
                message:"FOlder renamed successfully",
                data :updated,
            });
        } catch(err : any){
            console.log("===== ERROR CAUGHT =====");
            console.log("Error name:", err?.name);
            console.log("Error message:", err?.message);
            console.log("Full error:", err);

            if(err?.name === "ZodError"){
                return res.status(400).json({
                    message:"Validation error",
                });
            }
            return res.status(400).json({
                message: err.message || "Failed to rename folder"
            })
        }
    }

    static async delete(req:AuthRequest , res:Response){
       
        try{
            const userId = req.user!.id;
            const folderId = Number(req.params.id);
            
            const result = await FolderService.deleteFolder(userId , folderId);

            return res.status(200).json({
                message:"Folder deleted successfully",
                data : result,
            });
        } catch(err : any){
            return res.status(400).json({
                message: err.message || "Failed to delete folder"
            });
        }
    }
}