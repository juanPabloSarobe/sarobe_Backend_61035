import { httpResponse } from "../utils/httpResponse.js";

export const isAdmin = (req, res, next) => {
  try {
    const { role } = req.session?.message;
    if (role !== "admin") {
      httpResponse.Unauthorized(res, { role: role }, "administrator role only");
    } else {
      return next();
    }
  } catch (error) {
    next(error);
  }
};
