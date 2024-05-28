import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, require: true, max: 50 },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  img: [String],
  code: { type: String, require: true, unique: true },
  stock: { type: Number, require: true },
  category: {
    type: String,
    enum: {
      values: [
        "Cervezas",
        "Vinos",
        "Licores",
        "Tés",
        "Refrescos",
        "Bebidas sin alcohol",
        "Cócteles listos para beber",
        "Cafés",
        "Combos",
      ],
      message: "{VALUE} no es una categoría valida",
    },
    require: true,
  },
  status: { type: Boolean, default: true },
});

export const ProductModel = model("products", ProductSchema);
