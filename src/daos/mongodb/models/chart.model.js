import { Schema, model } from "mongoose";

const ChartSchema = new Schema({
  products: [],
});

export const ChartModel = model("charts", ChartSchema);
