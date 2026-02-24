import AppError from "../utils/app.error.js";

// eslint-disable-next-line no-unused-vars
const globalErrorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    return sendErrorDevelopment(err, res);
  }

  let error = { ...err };

  // Mongo / Mongoose handlers
  if (error.name === "CastError") error = handleCastErrors(error);
  if (error.name === "BSONError") error = handleBSONError();
  if (error.code === 11000) error = handleDuplicatedField(error);
  if (error.errors) error = handleValidation(error.errors);
  if (error.name === "JsonWebTokenError") error = hadnleJWTError();
  if (error.name === "TokenExpireError") error = handleJWTExpireError();

  sendErrorProduction(error, res);
};

export default globalErrorController;

// Development Error Handling
function sendErrorDevelopment(err, res) {
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
}

// Production Custom Error Handling
function sendErrorProduction(err, res) {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programming / unknown error → hide details
  console.error("UNEXPECTED ERROR:", err);

  res.status(500).json({
    status: "error",
    message: "Something went very wrong",
  });
}

// Specific Error Handlers
function handleCastErrors(err) {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
}

function handleBSONError() {
  return new AppError(`Invalid ID format`, 400);
}

function handleDuplicatedField(err) {
  const value = err.errorResponse?.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0];

  return new AppError(
    `Duplicate field value: ${value?.slice(1, -1) || "unknown"}`,
    400,
  );
}

function handleValidation(errors) {
  const messages = Object.values(errors).map((el) => el.message);

  return new AppError(messages.join(". "), 400);
}

const hadnleJWTError = () =>
  new AppError("Invalid Token! Please login again", 401);

const handleJWTExpireError = () =>
  new AppError("Invalid Session, Please login again", 401);
