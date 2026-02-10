import express from "express";
import {
  addNewProduct,
  findProductAndReplace,
  getProductByID,
  getProducts,
  findProductAndUpdate,
  findProductAndDelete,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.route("/").get(getProducts).post(addNewProduct);
productRouter
  .route("/:id")
  .get(getProductByID)
  .put(findProductAndUpdate)
  .patch(findProductAndReplace)
  .delete(findProductAndDelete);

export default productRouter;
