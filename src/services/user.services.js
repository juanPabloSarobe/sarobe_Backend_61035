import UserDao from "../daos/mongodb/user.dao.js";

const userDao = new UserDao();

export const register = async (user) => {
  try {
    return await UserDao.register(user);
  } catch (error) {
    throw new Error(error);
  }
};
export const login = async (email, password) => {
  try {
    return await UserDao.login(email, password);
  } catch (error) {
    throw new Error(error);
  }
};
