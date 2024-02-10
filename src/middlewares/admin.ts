//THis will be our auth miidleware where we will have the logic to use the auth token 
//before calling the apis

import { NextFunction, Request, Response } from "express"
import { UnauthorisedException } from "../exceptions/unauthorised"
import { ErrorCodes } from "../exceptions/root"

export const adminMiddleware:any = async(req: Request, res: Response, next: NextFunction)=>{
   const user = req.user
   if(user.role === "ADMIN"){
    next()
   }
   else{
    next(new UnauthorisedException("Unauthorised",ErrorCodes.UNAUTHORISED))
   }

}