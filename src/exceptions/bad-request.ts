import { ErrorCodes, HttpException } from "./root";

export class BadRequestException extends HttpException{
    constructor(message: string,errorCodes: ErrorCodes){
        super(message,errorCodes,400,null)
    }
}

//Here we made a badreq exception class, which extends the HttpException class
//Status code is 400 for bad req