const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;
    console.error(err.stack);
    if (err.name === "CastError") {
      error.message = `Resource not found with id of ${err.value}`;
      error = new Error(message);
      error.statusCode = 404;
    }

    if (err.code === 11000) {
      error.message = `Duplicate field value entered`;
      error = new Error(message);
      error.statusCode = 400;
    }

    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.json(", "));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });
  } catch (error) {
    next(error);
  }
};


export default errorMiddleware;