//import UserDao from "../daos/mongodb/user.dao.js";
import { createHash, isValidPassword } from "../utils/utils.js";
import persistence from "../daos/factory.js";
const { userDao, cartDao } = persistence;
import UserRepository from "../repository/user.repository.js";
const userRepository = new UserRepository();

export const register = async (userData) => {
  try {
    const { email, password } = userData;
    const existUser = await getUserByEmail(email);
    if (!existUser) {
      const cartUser = await cartDao.create();
      const role = email === "adminCoder@coder.com" ? "admin" : "user";
      const userHashed = {
        ...userData,
        role,
        password: createHash(password),
        cart: cartUser._id,
      };

      const user = await userDao.register(userHashed);

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
    if (!userExist) return null;
    const passValid = isValidPassword(password, userExist.password);
    console.log("not valid password");
    if (!passValid) return null;
    return userExist;
  } catch (error) {
    throw new Error(error);
  }
};
export const getUserById = async (id) => {
  try {
    return await userRepository.getUserById(id);
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
