import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    sdescription: { type: String, required: true },
    sbid: { type: Number, required: true }, 
    bdescription: { type: String, required: true },
    highestbid: { type: Number, default: 0 },
    highestbidder: { type: String, default: "" }
  },
  { timestamps: true } 
);

const Product = mongoose.model("Product", productSchema);
export default Product;
