import * as service from "../services/user.services.js";
import { createHash, isValidPassword } from "../utils.js";

export const register = async (req, res, next) => {
  try {
    const userHash = { ...req.body, password: createHash(req.body.password) };
    const user = await service.register(userHash);
    if (user?.error) {
      req.session.message = user.error;
      res.redirect("/vistas/register");
    }
    if (!user) res.status(404).json({ msj: "Bad request" });
    else res.redirect("/vistas");
  } catch (error) {
    next(error.message);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await service.login(email);
    if (!user) {
      req.session.error = "Usuario o mail incorrecto";
      res.redirect("/vistas");
    } else {
      if (!isValidPassword(password, user.password)) {
        req.session.error = "Usuario o mail incorrecto";
        res.redirect("/vistas");
      } else {
        const isAdmin =
          user._doc.email === "adminCoder@coder.com"
            ? { role: "admin" }
            : { role: user._doc.role };
        const message = {
          msg: { ...user._doc, ...isAdmin },
        };

        req.session.message = message.msg;
        req.session.info = {
          loggedIn: true,
          contador: 1,
          username: user.username,
          admin: user.admin,
        };
        res.redirect("/vistas/products?limit=3&page=1");
      }
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

export const logout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/vistas");
};
