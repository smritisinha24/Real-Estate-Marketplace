// to create user defined errors like password is not long enough

export const errorHanlder = (statusCode , message)=>{
    const error = new Error()
    error.statusCode = statusCode
    error.message = message
    return error
};