import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

import app from "./app.js";

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_TEST_URL);
  } catch (e) {
    console.log("Database Went Wrong", e);
  }

  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  console.log("Mongoose readyState:", mongoose.connection.readyState);

  app.listen(process.env.PORT, () => {
    console.log("---Server OK---");
  });
}

main().catch((err) => {
  console.log(err);
});
