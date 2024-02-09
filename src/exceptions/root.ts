//message,status code,error codes,actual errors

//We will need to extend the default Error class of JS

export class HttpException extends Error{
    message: string;
    errorCode: ErrorCodes;
    statusCode: number;
    errors: any;

    constructor(message:string,errorCode: ErrorCodes,statusCode: number,errors: any){
        super(message)
        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.errors = errors
    }
}

export enum ErrorCodes {
     USER_NOT_FOUND = 1001,
     USER_ALREADY_EXISTS = 1002,
     INCORRECT_PASSWORD = 1003,
     UNPROCESSABLE_ENTITY = 2001,
     INTERNAL_SERVER_ERROR = 3001
}