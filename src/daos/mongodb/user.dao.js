import { UserModel } from "./models/user.model.js";

export default class UserDao {
  register = async (user) => {
    try {
      const newUser = await UserModel.create(user);
      return newUser;
    } catch (error) {
      if (error.errorResponse.code === 11000) {
        const newUser = {
          error: "El usuario ya existe",
        };

        return newUser;
      } else {
        throw new Error(error.errorResponse);
      }
    }
  };

  login = async (email) => {
    try {
      console.log("email= ", email);
      const isLogin = await UserModel.findOne({ email });
      console.log("isLogin= ", isLogin);
      return isLogin;
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      console.log("id= ", id);
      const resp = await UserModel.findById(id);
      console.log("resp= ", resp);
      return resp;
    } catch (error) {
      throw new Error(error);
    }
  };
}
