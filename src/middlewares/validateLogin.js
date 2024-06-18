export const validateLogin = (req, res, next) => {
  if (req.session?.info?.loggedIn === undefined) {
    console.log("error1");
    res.redirect("/vistas");
  } else if (req.session.info && req.session.info.loggedIn) next();
  else {
    console.log("error2");
    res.redirect("/vistas");
  }
};

export const isLogued = (req, res, next) => {
  if (req.session?.info?.loggedIn === undefined) {
    next();
  } else if (!req.session.info.loggedIn) next();
  else res.redirect("/vistas/profile");
};

export const isAuth = (req, res, next) => {
  if (!Object.hasOwn(req.session, "passport")) return next();
  if (req.session.passport && req.session.passport.user) {
    if (!req.isAuthenticated()) return next();
  }
  res.redirect("/vistas/profile");
};
