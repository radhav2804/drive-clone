import { AuthRequest } from "../middlewares/auth.middlewares";
import { Response } from "express";
import prisma from '../config/prisma';
import { FileService } from "../services/file.services";
import path from "path";


export class FileController{
    static async upload(req:AuthRequest, res:Response){
        try{
            const userId = req.user!.id;
            const folderId = Number(req.query.folderId);
            console.log("folder id: ", folderId);
            const file =req.file;
            if(!file) throw new Error("File do not exists");

            const saved = await FileService.savefile(
                    userId, 
                    folderId,
                    file
            );
            console.log(saved);

            return res.status(201).json({
                message:"File uploaded successfully.",
                data:saved,
            })
        } catch(err : any){
            return res.status(400).json({
                message:err.message
            });
        }
    }

    static async download(req:AuthRequest, res:Response){
        try{
            const userId = req.user!.id;
            const fileId = Number(req.params.id);

            const file = await FileService.getfile(userId, fileId);
            
           return res.download(path.resolve(file.path),file.name);

        }catch(err : any){
            return res.status(400).json({
                message:err.message
            })
        }
    }

    static async delete(req: AuthRequest, res:Response){
        try{
            const userId = req.user!.id;
            const fileId = Number(req.params.id);

            const file = await FileService.deletefile(userId , fileId);
            
            return res.status(200).json({
                message:"file deleted",
                data:file,
            })
        } catch(err : any){
            res.status(400).json({
                message:err.message
            });
        }
    }
}