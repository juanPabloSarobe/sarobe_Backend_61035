import { httpResponse } from "../utils/httpResponse.js";
export const errorHandler = (error, req, res, next) => {
  const status = error.stack || 500;

  httpResponse.ServerError(res, error.message);
};
