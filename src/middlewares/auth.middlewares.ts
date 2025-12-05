import type {Request, Response, NextFunction} from 'express';
import {verifyToken} from '../utils/jwt';

export interface AuthRequest extends Request{
    user?:{
        id:number;
        email:string;
    }
}

export const requireAuth = (
    req : AuthRequest,
    res : Response,
    next : NextFunction
) : void => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
         res.status(401).json({message:"Unauthorized"});
         return ;
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({message:"Unauthorized"});
        return;
    }
    try{
        const payload = verifyToken(token);
        req.user = {
            id : payload.userId,
            email : payload.email,
        };
        next();
    } catch(err){
        res.status(401).json({message:"Invalid or expired token"});
        return ;
    }
}
