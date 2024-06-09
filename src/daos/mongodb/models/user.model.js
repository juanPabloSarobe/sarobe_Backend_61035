import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  first_name: { String, require: true },
  last_name: { String, require: true },
  email: { String, require: true, unique: true },
  age: { Number, require: true },
  password: { String, require: true },
  role: { String, default: "user" },
});

export const UserModel = model("users", UserSchema);
