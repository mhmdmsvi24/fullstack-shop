import { ProductModel } from "../models/products.schema.js";
import { APIFeatures } from "../utils/helpers.js";

// TODO: add more filters like brand, size, color using current database dynamic values
export async function getProducts(req, res) {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: { code: 500, message: "Something Went Wrong!" },
      error: ["Something went wrong"],
    });
  }
}

export async function getProductByID(req, res) {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);

    res.status(200).json({
      status: { code: 200, message: "Success" },
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: { code: 500, message: "Something Went Wrong!" },
      error: ["Something went wrong"],
    });
  }
}

export async function addNewProduct(req, res) {
  try {
    const newProductData = req.body;

    const newAddedProduct = await ProductModel.insertOne(newProductData);

    res.status(200).json({
      status: { code: 201, message: "Created" },
      data: newAddedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: { code: 500, message: "Something Went Wrong!" },
      error: ["Something went wrong"],
    });
  }
}

export async function findProductAndUpdate(req, res) {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: { code: 500, message: "Something Went Wrong!" },
      error: ["Something went wrong"],
    });
  }
}

export async function findProductAndReplace(req, res) {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: { code: 500, message: "Something Went Wrong!" },
      error: ["Something went wrong"],
    });
  }
}

export async function findProductAndDelete(req, res) {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id);

    if (!product) {
      res.status(500).json({
        status: { code: 404, message: "Not Found" },
        error: ["Couldn't find the product!"],
      });
    }

    await ProductModel.findByIdAndDelete(id);

    res.status(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: { code: 500, message: "Something Went Wrong!" },
      error: ["Something went wrong"],
    });
  }
}
