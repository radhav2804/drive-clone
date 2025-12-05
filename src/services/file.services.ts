import prisma from "../config/prisma";

export class FileService{
    static async savefile(userId:number , folderId:number , file:Express.Multer.File){
        //we have to save file metadata in db
        if(folderId){
            const folder  = await prisma.folder.findFirst({
                where:{id:folderId , userId}
            })
            if(!folder){
                throw new Error('folder not found or access denied');
            }
        }
        const savedfile = await prisma.file.create({
            data:{
                name:file.filename,
                path:file.path,
                size:file.size,
                mimeType:file.mimetype,
                folderId, 
                userId,
            }
        });
        return savedfile;
    }

    static async getfile(userId:number, id:number) {
        const file = await prisma.file.findFirst({
            where:{
                id, userId
            }
        });

        if(!file){
            throw new Error("file not found or access denied");
        }
        return file;
    }

    static async deletefile(userId:number, id:number){
        const file = await prisma.file.findFirst({
            where:{
                id, userId
            }
        });
        if(!file){
            throw new Error("file not found or access denied");
        }
        await prisma.file.delete({where:{id ,userId}});
        return file;
    }
}