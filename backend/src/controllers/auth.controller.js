import UserModel from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";
import { signJWT, verifyJWT } from "../utils/utils.js";
import AppError from "../utils/app.error.js";

export const signup = catchAsync(async (req, res) => {
  const { name, email, phone, password, passwordConf } = req.body;

  const newUser = await UserModel.create({
    name,
    email,
    phone,
    password,
    passwordConf,
  });

  const token = await signJWT({ id: newUser._id });

  res.status(201).json({
    status: {
      code: 201,
      message: "created",
    },
    token,
    data: newUser,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && !password)
    return new AppError("Missing Email or Password", 400);

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user.deleted) {
    const isPasswordCorrect = user.comparePassword(password, user.password);
    if (isPasswordCorrect) {
      const token = await signJWT({ id: user._id });

      res.status(200).json({
        status: {
          code: 200,
          message: "Success",
        },
        token,
        data: user,
      });
    }
  }

  return next(new AppError("Invalid Email or Password", 400));
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // If token exists in the auth header
  if (!token) {
    return next(new AppError("Please Login", 401));
  }

  const decoded = await verifyJWT(token);
  const user = await UserModel.findOne({ _id: decoded.id });

  // if any user exists with this token
  if (!user) return next(new AppError("Invalid Session! Please Login", 401));

  // if the user changed password recently (invalid token)
  if (user.changedPasswordAfterJWT(decoded.iat))
    return new AppError(
      "Your Password Changed Recently, Please Login Again",
      401,
    );

  req.user = user;
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError("Permission Denied", 403));

    next();
  };
};
