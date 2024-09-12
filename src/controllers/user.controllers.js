import * as services from "../services/user.services.js";
import { httpResponse } from "../utils/httpResponse.js";
import { createHash, isValidPassword } from "../utils/utils.js";
import { sendGmail } from "./email.controllers.js";
import persistence from "../daos/factory.js";
const { userDao } = persistence;

export const register = async (req, res, next) => {
  try {
    const userId = req.session.passport?.user;
    if (userId) {
      const user = await services.getUserById(userId);
      req.session.message = user;
      req.session.emailType = "register";
      await sendGmail(req, res, next);
      httpResponse.Ok(res, user);
    } else {
      httpResponse.Unauthorized(res, user, "User not logued");
    }
  } catch (error) {
    next(error.message);
  }
};
export const login = async (req, res, next) => {
  try {
    let id = null;
    if (req.session.passport && req.session.passport.user)
      id = req.session.passport.user;
    const user = await services.getUserById(id);
    if (!user) {
      req.session.error = "Usuario o mail incorrecto";
      httpResponse.NotFound(res, user, req.session.error);
    } else {
      const {
        first_name,
        last_name,
        email,
        age,
        role,
        cart,
        last_connection,
        documents,
        status,
      } = user;

      const message = {
        msg: {
          first_name,
          last_name,
          email,
          age,
          role,
          cart,
          last_connection,
          documents,
          status,
        },
      };
      req.session.message = message.msg;
      req.session.info = {
        loggedIn: true,
        contador: 1,
      };
      req.session.emailType = "login";
      sendGmail(req, res, next);
      httpResponse.Ok(res, req.session);
    }
  } catch (error) {
    next(error.message);
  }
};

export const infoSession = async (req, res, next) => {
  const userId = req.session.passport?.user;
  if (userId) {
    const user = await services.getUserById(userId);
    const { first_name, last_name, email, age, role, cart } = user;
    const isAdmin =
      email === "adminCoder@coder.com" ? { role: "admin" } : { role: role };
    const message = {
      msg: { first_name, last_name, email, age, role, cart, ...isAdmin },
    };
    req.session.message = message.msg;
  }
  httpResponse.Ok(res, {
    session: req.session,
    sessionId: req.sessionID,
    cookies: req.cookies,
  });
};

export const logout = async (req, res, next) => {
  //res.clearCookie("connect.sid");
  //res.clearCookie("product"); para eliminar cookies
  req.session.destroy();

  httpResponse.Ok(res, "", "session cerrada correctamente");

  // res.redirect("/api/vistas");
};

export const githubResponse = async (req, res, next) => {
  try {
    const { first_name, last_name, email, role, isGithub, age = 18 } = req.user;
    const message = {
      msg: { first_name, last_name, email, age, role, isGithub },
    };
    req.session.message = message.msg;
    req.session.info = {
      loggedIn: true,
      contador: 1,
    };
    httpResponse.Ok(res, req.session);
    //res.redirect("/api/vistas/products?limit=3&page=1");
  } catch (error) {
    next(error);
  }
};

export const current = async (req, res, next) => {
  try {
    const userId = req.session.passport?.user;
    if (userId) {
      const user = await services.getUserById(userId);
      req.session.message = user;
      httpResponse.Ok(res, user);
    } else {
      httpResponse.Unauthorized(res, user, "User not logued");
    }
  } catch (error) {
    next(error);
  }
};

export const updProfile = async (req, res, next) => {
  try {
    const { documents, email } = req.session?.message;
    const id = req.session.passport.user;
    const document = {
      type: req.file.fieldname,
      name: req.file.filename,
      reference: req.file.path,
    };
    const existProfile = documents.findIndex(
      ({ type }) => type == req.file.fieldname
    );
    if (existProfile === -1) documents.push(document);
    else documents.splice(existProfile, 1, document);

    const user = await services.updateProfile(id, documents);
    if (user.documents.length === 3) {
      const status = await services.update(id, { status: true });
      req.session.message.status = status;
    }
    if (!user) return httpResponse.NotFound(res, user, "Not found");
    return httpResponse.Ok(res, documents, "Profile Image uploaded");
  } catch (error) {
    res.json(error.message);
  }
};
export const sendResetPassMail = async (req, res, next) => {
  try {
    const token = createHash("hola");
    const user = req.session?.message;
    res.cookie("token", token, { maxAge: 60000 });
    req.session.emailType = "reset";
    sendGmail(req, res, next);
    httpResponse.Ok(res, "cookie generada");
  } catch (error) {
    next(error);
  }
};
export const getCookie = async (req, res, next) => {
  try {
    //const user = req.session.message;
    const { token } = req.cookies;
    if (!token)
      return httpResponse.Forbidden(res, "Token expires, get a new token");
    return httpResponse.Ok(res, token);
  } catch (error) {
    next(error);
  }
};
export const updatePass = async (req, res, next) => {
  try {
    const id = req.session?.passport?.user;
    const { token } = req.cookies;
    if (!token)
      return httpResponse.Forbidden(res, "Token expires, get a new token");

    const user = await userDao.getById(id);
    const { password } = user;
    const { newPassword } = req.body;
    const samePass = isValidPassword(newPassword, password);

    if (samePass)
      return httpResponse.Unauthorized(res, "you can not repeat a password");

    const hashPass = createHash(newPassword);
    const resp = await services.resetPassword(id, hashPass);
    res.clearCookie("token");
    req.session.emailType = "passwordRestored";
    sendGmail(req, res, next);
    return httpResponse.Ok(res, resp);
  } catch (error) {
    next(error);
  }
};
export const update = async (req, res, next) => {
  try {
    const id = req.session?.passport?.user;
    const newUserData = req.body;
    const { first_name, last_name, age } = newUserData;
    const newData = { first_name, last_name, age };
    const user = await services.update(id, newData);
    req.session.message = user;
    req.session.emailType = "updateUser";
    sendGmail(req, res, next);
    return httpResponse.Ok(res, user);
  } catch (error) {
    next(error);
  }
};
export const updatePremium = async (req, res, next) => {
  try {
    const id = req.session?.passport?.user;
    const user = await userDao.getById(id);
    const { status } = user || false;

    let role = req.session?.message.role;
    if (role === "user") {
      if (status === true) {
        role = "premium";
      } else {
        return httpResponse.Unauthorized(
          res,
          status,
          "You need upload all de documents for be an Premium user"
        );
      }
    } else if (role === "premium") {
      role = "user";
    }

    const newUser = await services.update(id, { role });
    req.session.message = newUser;
    role === "premium" && (req.session.emailType = "rolePremium");
    role === "user" && (req.session.emailType = "roleUser");
    sendGmail(req, res, next);
    return httpResponse.Ok(res, newUser);
  } catch (error) {
    next(error);
  }
};
