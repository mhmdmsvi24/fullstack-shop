// ! Don't remove this eslint rule, removeing unused next results in error
// eslint-disable-next-line no-unused-vars
const globalErrorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Something Went Wrong!, It's Not You, It's Us :(";
  // If it's production don't send error stack
  if (process.env.NODE_ENV === "development") {
    sendErrorDevelopment(err, res);
  } else {
    sendErrorProduction(err, res);
  }
};

function sendErrorDevelopment(err, res) {
  res.status(err.statusCode).json({
    status: { code: err.statusCode, message: err.status },
    error: err.message,
    stack: err.stack,
  });
}

function sendErrorProduction(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: { code: err.statusCode, message: err.status },
      error: err.message,
    });
    // Programming Errors, don't leak details
  } else {
    console.log("---ERROR---", err);
    res.status(500).json({
      status: { code: 500, message: "Internal Server Error" },
      message: "Oops! It's not you it's us :(",
    });
  }
}

export default globalErrorController;
