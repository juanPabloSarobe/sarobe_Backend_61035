import { pResp } from "../utils.js";

export const isAdmin = (req, res, next) => {
  try {
    const { role } = req.session?.message;
    if (role !== "admin") {
      pResp(res, 401, "user administrator only");
    } else {
      return next();
    }
  } catch (error) {
    next(error);
  }
};
