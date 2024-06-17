import UserDao from "../daos/mongodb/user.dao.js";
import { createHash, isValidPassword } from "../utils.js";

const userDao = new UserDao();

export const register = async (userData) => {
  try {
    const { email, password } = userData;
    const existUser = await getUserByEmail(email);
    if (!existUser) {
      const userHashed = { ...userData, password: createHash(password) };

      const user = await userDao.register(userHashed);
      if (user?.error) {
        req.session.message = user.error;
        res.redirect("/vistas/register");
      }
      if (!user) res.status(404).json({ msj: "Bad request" });
      else return user;
    } else return null;
  } catch (error) {
    throw new Error(error);
  }
};
export const login = async ({ email, password }) => {
  try {
    const userExist = await userDao.login(email);
    console.log("UserExist= ", userExist);
    if (!userExist) return null;
    const passValid = isValidPassword(password, userExist.password);
    if (!passValid) return null;
    return userExist;
  } catch (error) {
    throw new Error(error);
  }
};
export const getUserById = async (id) => {
  try {
    return await userDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};
export const getUserByEmail = async (email) => {
  try {
    return await userDao.login(email);
  } catch (error) {
    throw new Error(error);
  }
};
