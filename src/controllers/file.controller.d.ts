import { AuthRequest } from "../middlewares/auth.middlewares";
import { Response } from "express";
export declare class FileController {
    static upload(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static download(req: AuthRequest, res: Response): Promise<void | Response<any, Record<string, any>>>;
    static delete(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=file.controller.d.ts.map