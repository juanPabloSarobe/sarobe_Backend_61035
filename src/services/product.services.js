import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
const productDao = new ProductDaoMongoDB();

export const getAll = async (title, page, limit, sort) => {
  try {
    return await productDao.getAll(title, page, limit, sort);
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllWebSocket = async () => {
  try {
    return await productDao.getAllWebSocket();
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllWebSocketPaginated = async (title, page, limit, sort) => {
  try {
    return await productDao.getAllWebSocketPaginated(title, page, limit, sort);
  } catch (error) {
    throw new Error(error);
  }
};
export const getById = async (id) => {
  try {
    return await productDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};
export const getByCategory = async (category, stock, page, limit, sort) => {
  try {
    return await productDao.getByCategory(category, stock, page, limit, sort);
  } catch (error) {
    throw new Error(error);
  }
};
export const create = async (product) => {
  try {
    return await productDao.create(product);
  } catch (error) {
    throw new Error(error);
  }
};
export const update = async (id, product) => {
  try {
    return await productDao.update(id, product);
  } catch (error) {
    throw new Error(error);
  }
};
export const remove = async (id) => {
  try {
    return await productDao.delete(id);
  } catch (error) {
    throw new Error(error);
  }
};
