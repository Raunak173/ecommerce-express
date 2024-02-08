import { Request,Response } from "express"
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets";

export const login = async(req: Request,res:Response)=>{
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

export const signup = async(req: Request,res:Response)=>{
    const {email,password,name} = req.body;
    let user = await prismaClient.user.findFirst({where: {email:email}})
    if(user){
        throw Error("User already exists")
    }
    user = await prismaClient.user.create({
        data:{
            name,
            email,
            password: hashSync(password,10)
        }
    })
    res.json(user)
}
