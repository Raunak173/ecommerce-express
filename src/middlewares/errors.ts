import { HttpException } from "../exceptions/root";
import { NextFunction, Request, Response } from "express";

//We need a middleware to handle error handling

export const errorMiddleware =(error: HttpException, req: Request, res: Response, next: NextFunction)=>{
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
        errors: error.errors
    })
}