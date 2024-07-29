import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

export const pResp = (res, statusCode, data) => {
  return res.status(statusCode).json({ data });
};
