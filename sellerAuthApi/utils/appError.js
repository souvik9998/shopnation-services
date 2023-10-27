class AppError extends Error{
    constructor(message , statusCode){
        // setting the modified values in the error
        super(message);

        this.statusCode=  statusCode;
        this.status =  `${statusCode}`.startsWith('4')?'fail':'error';
        this.koko = "this is my modified error";
        //operational errror
        this.isOperational =  true;

        Error.captureStackTrace(this,this.constructor);
    }
}
module.exports =AppError;