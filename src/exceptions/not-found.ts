import { ErrorCodes, HttpException } from "./root";

export class NotFoundException extends HttpException{
    constructor(message: string,errorCodes: ErrorCodes){
        super(message,errorCodes,404,null)
    }
}

//Here we made a not found exception class, which extends the HttpException class
//Status code is 404 for not found