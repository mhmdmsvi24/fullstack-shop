import express from "express";
import morgan from "morgan";
import cors from "cors";
import productRouter from "./routers/product.router.js";

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

export default app;
