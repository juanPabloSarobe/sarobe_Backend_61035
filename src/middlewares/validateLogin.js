export const validateLogin = (req, res, next) => {
  if (req.session?.info?.loggedIn === undefined) {
    res.redirect("/vistas");
  } else if (req.session.info && req.session.info.loggedIn) next();
  else res.redirect("/vistas");
};

export const isLogued = (req, res, next) => {
  if (req.session?.info?.loggedIn === undefined) {
    next();
  } else if (!req.session.info.loggedIn) next();
  else res.redirect("/vistas/profile");
};
