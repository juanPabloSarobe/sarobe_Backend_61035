import { UserModel } from "./models/user.model.js";

export default class UserDao {
  register = async (user) => {
    try {
      const newUser = await UserModel.create(user);
      return newUser;
    } catch (error) {
      throw new Error(error.errorResponse);
    }
  };

  login = async (email) => {
    try {
      const isLogin = await UserModel.findOne({ email });
      return isLogin;
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const resp = await UserModel.findById(id);
      return resp;
    } catch (error) {
      throw new Error(error);
    }
  };
}
