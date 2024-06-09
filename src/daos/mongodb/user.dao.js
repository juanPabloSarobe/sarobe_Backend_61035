import { UserModel } from "./models/user.model.js";

export default class UserDao {
  register = async (user) => {
    try {
      const user = await UserModel.create(user);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  login = async (email, password) => {
    try {
      const isLogin = await UserModel.findOne({ email, password });
      return isLogin;
    } catch (error) {
      throw new Error(error);
    }
  };
}
