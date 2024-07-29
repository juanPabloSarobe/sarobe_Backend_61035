import * as services from "../services/user.services.js";
import { isValidPassword, pResp } from "../utils.js";

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
      pResp(req, 404, req.session.error);
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
      pResp(res, 200, req.session);
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
  pResp(res, 200, {
    session: req.session,
    sessionId: req.sessionID,
    cookies: req.cookies,
  });
};

export const logout = async (req, res, next) => {
  //res.clearCookie("connect.sid");
  //res.clearCookie("product"); para eliminar cookies
  req.session.destroy();

  pResp(res, 200, { msj: "session cerrada correctamente" });

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
    pResp(res, 200, req.session);
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
      console.log("UserController:", user);
      req.session.message = user;
      pResp(res, 200, user);
    } else {
      pResp(res, 404, { msg: "User not logued" });
    }
  } catch (error) {
    next(error);
  }
};
