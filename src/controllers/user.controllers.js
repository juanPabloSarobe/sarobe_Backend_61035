import * as services from "../services/user.services.js";
import { isValidPassword } from "../utils.js";

export const register = async (req, res, next) => {
  try {
    res.redirect("/vistas");
  } catch (error) {
    next(error.message);
  }
};
export const login = async (req, res, next) => {
  try {
    const { password } = req.body;
    let id = null;
    if (req.session.passport && req.session.passport.user)
      id = req.session.passport.user;
    const user = await services.getUserById(id);
    if (!user) {
      req.session.error = "Usuario o mail incorrecto";
      res.redirect("/vistas");
    } else {
      const { first_name, last_name, email, age, role } = user;
      const isAdmin =
        email === "adminCoder@coder.com" ? { role: "admin" } : { role: role };
      const message = {
        msg: { first_name, last_name, email, age, role, ...isAdmin },
      };
      req.session.message = message.msg;
      req.session.info = {
        loggedIn: true,
        contador: 1,
      };
      res.redirect("/vistas/products?limit=3&page=1");
    }
  } catch (error) {
    next(error.message);
  }
};

export const infoSession = (req, res, next) => {
  res.json({
    session: req.session,
    sessionId: req.sessionID,
    cookies: req.cookies,
  });
};

export const logout = async (req, res, next) => {
  req.session.destroy();
  res.redirect("/vistas");
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
    res.redirect("/vistas/products?limit=3&page=1");
  } catch (error) {
    next(error);
  }
};
