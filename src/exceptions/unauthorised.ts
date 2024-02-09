import { ErrorCodes, HttpException } from "./root";

export class UnauthorisedException extends HttpException{
    constructor(message: string,errorCodes: ErrorCodes){
        super(message,errorCodes,401,null)
    }
}

//Here we made a unauthorised exception class, which extends the HttpException class
//Status code is 401 for unauthorised