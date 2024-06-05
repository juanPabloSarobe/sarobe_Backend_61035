import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ProductSchema = new Schema({
  title: { type: String, require: true, max: 50, index: true },
  description: { type: String, require: true, index: true },
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
    index: true,
  },
  status: { type: Boolean, default: true },
});
ProductSchema.plugin(mongoosePaginate);
export const ProductModel = model("products", ProductSchema);
