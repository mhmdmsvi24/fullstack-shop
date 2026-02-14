import mongoose from "mongoose";
import slugify from "slugify";

const productsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minLength: 4 },
  desc: { type: String },
  category: { type: String, required: true },
  size: { type: String, required: true },
  slug: { type: String, required: false, lower: true },
  rating: { type: Number, min: 0, max: 5, required: true, default: 0.0 },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  discount: { type: Number, min: 0, max: 1 },
  quantity: { type: Number, required: true },
  brand: { type: String },
  color: { type: String },
  image_url: { type: String, required: true },
  deleted: { type: Boolean, default: false, select: false },
  createdAt: { type: Date, default: Date.now(), select: false },
});

productsSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

productsSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.price = ret.price?.toString();
    return ret;
  },
});

export const ProductModel = mongoose.model("Product", productsSchema);
