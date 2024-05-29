export const errorHandler = (error, req, res, next) => {
  console.log(`error ${error.message} ${error.status}`);
  const status = error.status || 500;
  res.status(status).send(error.message);
};
