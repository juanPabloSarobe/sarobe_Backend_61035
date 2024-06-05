import { Schema, model } from "mongoose";

const ChartSchema = new Schema({
  products: [
    {
      _id: false,
      product: { type: Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number, default: 1 },
    },
  ],
});
ChartSchema.pre("find", function () {
  this.populate("products.product");
});

export const ChartModel = model("charts", ChartSchema);
