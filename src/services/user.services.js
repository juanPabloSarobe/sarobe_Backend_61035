import UserDao from "../daos/mongodb/user.dao.js";

const userDao = new UserDao();

export const register = async (user) => {
  try {
    return await userDao.register(user);
  } catch (error) {
    throw new Error(error);
  }
};
export const login = async (email) => {
  try {
    return await userDao.login(email);
  } catch (error) {
    throw new Error(error);
  }
};
