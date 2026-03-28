class ApiError extends Error{
    constructor(statusCode, message){
        super(message)
        this.statusCode = statusCode
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }

    static badRequest(message = "Bad request"){
        return new ApiError(400, message)
    }

    static Unauthorised(message = "Unauthorised"){
        return new ApiError(401, message)
    }

    static conflict(message = "Conflict - Data Already exist"){
        return new ApiError(409, message)
    }

    
}

export default ApiError