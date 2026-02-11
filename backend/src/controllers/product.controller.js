import { ProductModel } from "../models/products.schema.js";
import { APIFeatures } from "../utils/helpers.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/app.error.js";

// TODO: add more filters like brand, size, color using current database dynamic values
export const getProducts = catchAsync(async (req, res) => {
  const features = new APIFeatures(ProductModel.find(), req.query)
    .filter()
    .fields()
    .paginate()
    .sort();
  const result = await features.query;

  res.status(200).json({
    status: { code: 200, message: "success" },
    data: result,
    length: result.length,
  });
});

export const getProductByID = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);

  // If the ID is invalid
  if (!product) {
    return next(new AppError("This Tour doesn't exist!", 404));
  }

  res.status(200).json({
    status: { code: 200, message: "Success" },
    data: product,
  });
});

export const addNewProduct = catchAsync(async (req, res) => {
  const newProductData = req.body;

  const newAddedProduct = await ProductModel.insertOne(newProductData);

  res.status(200).json({
    status: { code: 201, message: "Created" },
    data: newAddedProduct,
  });
});

export const findProductAndUpdate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updatedProduct = await ProductModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: { code: 200, message: "Success" },
    data: updatedProduct,
  });
});

export const findProductAndReplace = catchAsync(async (req, res) => {
  const { id: _id } = req.params;
  const data = req.body;

  const patchedProduct = await ProductModel.findOneAndReplace({ _id }, data, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: { code: 200, message: "Success" },
    data: patchedProduct,
  });
});

export const findProductAndDelete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await ProductModel.findById(id);

  // If the ID is invalid
  if (!product) {
    return next(new AppError("This Tour doesn't exist!", 404));
  }

  if (!product) {
    res.status(500).json({
      status: { code: 404, message: "Not Found" },
      error: ["Couldn't find the product!"],
    });
  }

  await ProductModel.findByIdAndDelete(id);

  res.status(204);
});
