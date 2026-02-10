import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  desc: { type: String },
  category: { type: String, required: true },
  size: { type: String, required: true },
  slug: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, required: true, default: 0.0 },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    requried: true,
  },
  discount: { type: Number },
  quantity: { type: Number, required: true },
  brand: { type: String },
  color: { type: String },
  image_url: { type: String, required: true },
  deleted: { type: Boolean, default: false },
});

productsSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.price = ret.price?.toString();
    return ret;
  },
});

export const ProductModel = mongoose.model("Product", productsSchema);
