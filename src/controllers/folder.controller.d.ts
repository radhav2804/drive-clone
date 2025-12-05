import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middlewares';
export declare class FolderController {
    static getContents(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static createFolder(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static rename(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static delete(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=folder.controller.d.ts.map