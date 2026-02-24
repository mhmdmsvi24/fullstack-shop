import express from "express";
import morgan from "morgan";
import cors from "cors";
import productRouter from "./routers/product.router.js";
import AppError from "./utils/app.error.js";
import globalErrorController from "./controllers/error.controller.js";
import authRouter from "./routers/auth.router.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.set("query parser", "extended");

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
else app.use(morgan("combined"));

// Routers
app.use("/api/v1/products", productRouter);
app.use("/api/v1/auth", authRouter)

// Invalid Route
app.all("*splat", (req, res, next) => {
  next(new AppError(`${req.originalUrl} Doesn't Exist`, 404));
});

// Error Handling
app.use(globalErrorController);

export default app;
