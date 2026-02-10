import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(path.resolve(), ".env") });
import { ProductModel } from "../models/products.schema.js";
import productsJSON from "../data/products.json" with { type: "json" };
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_TEST_URL)
  .then(() => console.log("Connected Successfuly"));

async function resetDB() {
  try {
    const newProducts = await ProductModel.insertMany(productsJSON);
    console.log(
      `${newProducts.length} new items added to ${ProductModel.modelName} collection`,
    );
  } catch (e) {
    console.log(e);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

async function deleteDB() {
  try {
    const result = await ProductModel.deleteMany();
    console.log(
      `${result.deletedCount} items removed from ${ProductModel.modelName} collection`,
    );
  } catch (e) {
    console.log(e);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

if (process.argv[2] === "--reset") resetDB();
else if (process.argv[2] === "--delete") deleteDB();
