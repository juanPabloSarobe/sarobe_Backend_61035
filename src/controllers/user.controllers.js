import * as services from "../services/user.services.js";

export const register = async (req, res, next) => {
  try {
    res.json({
      msg: "Register OK",
      session: req.session,
    });
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
    if (!user) res.status(401).json({ msg: "Error de autenticacion" });
    const { first_name, last_name, email, age, role } = user;
    res.json({
      msg: "LOGIN OK!",
      user: {
        first_name,
        last_name,
        email,
        age,
        role,
      },
    });

    /*    const { email, password } = req.body;
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
    } */
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
