import { NextFunction, Request,Response } from "express"
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCodes } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validations";
import { SignUpSchema } from "../schemas/users";

export const signup = async(req: Request,res:Response,next: NextFunction)=>{
    try {
        SignUpSchema.parse(req.body)
        //This line performs validations
        const {email,password,name} = req.body;
        let user = await prismaClient.user.findFirst({where: {email:email}})
            if(user){
                // throw Error("User already exists")
                next(new BadRequestException("User already exists",ErrorCodes.USER_ALREADY_EXISTS))
            }
        user = await prismaClient.user.create({
            data:{
                name,
                email,
                password: hashSync(password,10)
            }
        })
        res.json(user)
    } catch (error: any) {
        next(new UnprocessableEntity(error?.issues,"Unprocessable Entity", ErrorCodes.UNPROCESSABLE_ENTITY))
    }
}

export const login = async(req: Request,res:Response, next: NextFunction)=>{
    //I added next function so that i can use the express error middleware
    const {email,password} = req.body;
    let user = await prismaClient.user.findFirst({where: {email:email}})
    if(!user){
        throw Error("User does not exists")
    }
    //This function takes the password given by user and also the saved password in the db and compares both of them
    if(!compareSync(password,user.password)){
        throw Error("Wrong password")
    }
    const token = jwt.sign({
        userId: user.id
    },JWT_SECRET)
    res.json({user,token})
}


