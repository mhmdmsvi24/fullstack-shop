import express from "express";
import {
  addNewProduct,
  findProductAndReplace,
  getProductByID,
  getProducts,
  findProductAndUpdate,
  findProductAndDelete,
} from "../controllers/product.controller.js";
import { protect, restrictTo } from "../controllers/auth.controller.js";

const productRouter = express.Router();

productRouter.route("/").get(getProducts).post(protect, addNewProduct);
productRouter
  .route("/:id")
  .get(getProductByID)
  .put(protect, restrictTo("admin"), findProductAndUpdate)
  .patch(protect, restrictTo("admin"), findProductAndReplace)
  .delete(protect, restrictTo("admin"), findProductAndDelete);

export default productRouter;
