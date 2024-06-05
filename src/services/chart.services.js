import ChartDaoMongoDB from "../daos/mongodb/chart.dao.js";
const chartDao = new ChartDaoMongoDB();

export const getAll = async () => {
  try {
    return await chartDao.getAll();
  } catch (error) {
    throw new Error(error);
  }
};
export const getById = async (id) => {
  try {
    return await chartDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const create = async (chart) => {
  try {
    return await chartDao.create(chart);
  } catch (error) {
    throw new Error(error);
  }
};
export const addProduct = async (id, productId, quantity) => {
  try {
    return await chartDao.addProduct(id, productId, quantity);
  } catch (error) {
    throw new Error(error);
  }
};
export const addManyProduct = async (id, products) => {
  try {
    return await chartDao.addManyProduct(id, products);
  } catch (error) {
    throw new Error(error);
  }
};

export const delProduct = async (id, productId) => {
  try {
    return await chartDao.delProduct(id, productId);
  } catch (error) {
    throw new Error(error);
  }
};

export const remove = async (id) => {
  try {
    return await chartDao.delete(id);
  } catch (error) {
    throw new Error(error);
  }
};
export const cleanCart = async (id) => {
  try {
    return await chartDao.cleanCart(id);
  } catch (error) {
    throw new Error(error);
  }
};
