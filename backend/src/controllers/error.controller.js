import AppError from "../utils/app.error.js";

// ! Don't remove this eslint rule, removeing unused next results in error
// eslint-disable-next-line no-unused-vars
const globalErrorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Something Went Wrong! It's Not You, It's Us :(";
  // If it's production don't send error stack
  if (process.env.NODE_ENV === "development") {
    sendErrorDevelopment(err, res);
  } else {
    let error = { ...err };

    if (error.name === "CastError") error = handleCastErrors(error);
    else if (error.name === "BSONError") error = handleBSONError(error);
    else if (error.code === 11000) error = handleDuplicatedFiled(error);

    if (error.errors) {
      let errorData = {};

      for (let [k, v] of Object.entries(error.errors)) {
        errorData[k] = {};
        errorData[k].name = v.constructor.name;
        errorData[k].message = `${v.kind} ${v.path} can't be ${v.value}`;
      }

      error = handleValidation(errorData);
    }

    sendErrorProduction(error, res);
  }
};

function sendErrorDevelopment(err, res) {
  res.status(err.statusCode).json({
    status: { code: err.statusCode, message: err.status },
    error: err,
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
    res.status(500).json({
      status: { code: 500, message: "Internal Server Error" },
      message: "Oops! It's not you it's us :(",
    });
  }
}

// Error Handlers
function handleCastErrors(err) {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
}

function handleBSONError(err) {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
}

function handleDuplicatedFiled(err) {
  const value = err.errorResponse.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  // to remove double back slashes
  const message = `Duplicated Field: ${value.split("").slice(1, -1).join("")} - Already Exists`;
  return new AppError(message, 400);
}

function handleValidation(err) {
  return new AppError(err, 400);
}

export default globalErrorController;
