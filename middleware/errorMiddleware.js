const errorMiddleware=async(err,req,res,next)=>{
    const defaultError={
        statusCode:500,
        success:'failed',
        message:err,
    }
    // log the error for debuging
if(err?.name==='ValidationError'){
    defaultError.statusCode=400,
    defaultError.message=Object.values(err.errors).map((el)=>el.message).join(',');
    
}
// duplicate key error
if(err?.code && err?.code===11000){
    defaultError.statusCode=409;
    defaultError.message=`${Object.keys(err.keyPattern).join(',')} must be unique`;

}
return res?.status(defaultError.statusCode).json({
    success:defaultError.success,
    message:defaultError.message
})
}
export default errorMiddleware;