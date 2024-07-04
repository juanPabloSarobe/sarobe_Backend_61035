import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  isGithub: { type: Boolean, default: false },
  cart: { type: Schema.Types.ObjectId, ref: "charts" },
});

UserSchema.pre("find", function () {
  this.populate("cart");
});

export const UserModel = model("users", UserSchema);
