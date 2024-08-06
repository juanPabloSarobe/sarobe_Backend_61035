import * as services from "../services/user.services.js";
import { httpResponse } from "../utils/httpResponse.js";
import { isValidPassword } from "../utils/utils.js";

export const register = async (req, res, next) => {
  try {
    current(req, res, next);
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
      const { first_name, last_name, email, age, role, cart } = user;

      const message = {
        msg: { first_name, last_name, email, age, role, cart },
      };
      req.session.message = message.msg;
      req.session.info = {
        loggedIn: true,
        contador: 1,
      };
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
