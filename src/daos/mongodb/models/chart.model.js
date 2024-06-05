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

export const ChartModel = model("charts", ChartSchema);
