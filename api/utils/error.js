// to create user defined errors like password is not long enough
// i.e create a middleware and a function to handle possible errors

export const errorHanlder = (statusCode , message)=>{
    const error = new Error()
    error.statusCode = statusCode
    error.message = message
    return error
};