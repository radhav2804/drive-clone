import type {Request, Response} from 'express';
import {AuthService} from '../services/auth.services';
import { registerSchema, loginSchema } from '../schemes/auth.schema';

export class AuthController{
    static async register(req:Request, res:Response){

        try{
            const parsed = registerSchema.parse(req.body);
            const result = await AuthService.register(parsed);

            res.status(201).json({message : 'User registered successfully', data: result});
        }catch(err : any){
            if(err?.name === "ZodError"){
                return res.status(400).json({message:"Validation errors" ,errors: err.errors});
            }
            
            return res.status(400).json({message: err.message || "Registration failed"});
        }
    }

    static async login(req:Request , res:Response){
        try{
            const parsed = loginSchema.parse(req.body);
            const result =await AuthService.login(parsed);

            return res.status(200).json({
                message:"Login successful", data:result
            });
        } catch(err : any){
            if(err?.name === "ZodError"){
                return res.status(400).json({message:"Validation errors" ,errors: err.errors});
            }
            
            return res.status(400).json({message: err.message || "Login failed"});
        }
    }
}