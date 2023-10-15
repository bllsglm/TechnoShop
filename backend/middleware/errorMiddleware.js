const notFound = (req,res,next) =>{
  const error = new Error(`not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}


//override the default express Handler and customize errorHandler
const errorHandler = (err, req,res,next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message;
  
  if(err.name === 'CastError' && err.kind === 'ObjectId' ){
    message = 'Resource not found';
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "🥞": err.stack
  })
}

export {notFound, errorHandler}