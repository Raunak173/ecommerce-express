import { NextFunction, Request, Response } from "express"
import { ErrorCodes, HttpException } from "./exceptions/root"
import { InternalException } from "./exceptions/internal-exception"
import { ZodError } from "zod"
import { BadRequestException } from "./exceptions/bad-request"

//This is our general error handler 
//If our error is an instanceof Http Exception, then exception = error
//else it means it is an unhandled error

export const errorHandler:any = (method: Function) =>{
    return async(req: Request,res: Response,next: NextFunction)=>{
        try {
            await method(req,res,next)
        } catch (error: any) {
            let exception: HttpException;
            if(error instanceof HttpException){
                exception = error
            } else{
                if(error instanceof ZodError){
                    exception = new BadRequestException("Unprocessable Entity",ErrorCodes.UNPROCESSABLE_ENTITY)
                } else{
                    exception = new InternalException("Something went wrong!",error,ErrorCodes.INTERNAL_SERVER_ERROR)
                }
            }
            next(exception)
        }
    }
}

//We are basically making a higher order function which takes a function as an argument and returns a function
//So over here we are returning a controller