import { ErrorCodes, HttpException } from "./root";

export class InternalException extends HttpException{
    constructor(message: string, errors: any, errorCode: ErrorCodes){
        super(message,errorCode,500,errors)
    }
}

//This is where we will handle InternalException