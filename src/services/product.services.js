import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
const productDao = new ProductDaoMongoDB();

export const getAll = async (title, limit, sort, query) => {
  try {
    return await productDao.getAll(title, limit, sort, query);
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
export const getById = async (id) => {
  try {
    return await productDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};
export const getByCategory = async (category) => {
  try {
    return await productDao.getByCategory(category);
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
