//THis will be our auth miidleware where we will have the logic to use the auth token 
//before calling the apis

import { NextFunction, Request, Response } from "express"
import { UnauthorisedException } from "../exceptions/unauthorised"
import { ErrorCodes } from "../exceptions/root"
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets"
import { prismaClient } from ".."

export const authMiddleware:any = async(req: Request, res: Response, next: NextFunction)=>{
   //extracting the token from header
   //if token is not present throw unauthorised error
   //if token is present then verify and extract the payload
   //get user from payload
   //attach user to current object

   const token:any = req.headers.authorization
   if(!token){
    next(new UnauthorisedException("Unauthorised",ErrorCodes.UNAUTHORISED))
   }
   try {
    const payload:any = jwt.verify(token,JWT_SECRET)
    const user:any = await prismaClient.user.findFirst({
        where: {id: payload.userid}
    })
    if(!user){
        next(new UnauthorisedException("Unauthorised",ErrorCodes.UNAUTHORISED))
    }
    req.user = user
    //There is no user key in req, so we need to extend the req class
    next()
   } catch (error) {
    next(new UnauthorisedException("Unauthorised",ErrorCodes.UNAUTHORISED))
   }

}