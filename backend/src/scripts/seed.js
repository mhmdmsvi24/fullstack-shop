import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(path.resolve(), ".env") });
import { ProductModel } from "../models/products.schema.js";
import productsJSON from "../data/products.json" with { type: "json" };
import mongoose from "mongoose";

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_TEST_URL);
    await ProductModel.insertMany(productsJSON);
  } catch (e) {
    console.log(e);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedDB();
