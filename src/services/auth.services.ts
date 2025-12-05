import bcrypt from 'bcrypt';
import prisma from '../config/prisma';
import type {RegisterInput, LoginInput} from '../schemes/auth.schema';
import {signToken} from '../utils/jwt';

export class AuthService{
    static async register( data : RegisterInput){
        const existing = await prisma.user.findUnique({where:{email:data.email}});
        if(existing){
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        //create user
        const user = await prisma.user.create({
            data:{
                name : data.name,
                email : data.email,
                password : hashedPassword,
            }
        });

        //create root folder for user
        await prisma.folder.create({
            data:{
                name:"root",
                userId : user.id,
                parentId : null,
            }
        });


        const token = signToken({userId: user.id, email: user.email});
        return {user , token}
    }

    static async login(data : LoginInput){
        const user = await prisma.user.findUnique({where:{email:data.email}});
        if(!user){
            throw new Error("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(data.password, user.password);
        if(!isMatch){
            throw new Error("Invalid email or password");
        }

        const token = signToken({userId: user.id, email:user.email});
        return {user , token};
    }
}

