import { Router } from "express";
import { isLogued } from "../middlewares/validateLogin.js";
import * as controller from "../controllers/user.controllers.js";
import passport from "passport";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/vistas/error",
  }),
  controller.register
);
router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/vistas/error",
  }),
  controller.login
);
router.get("/info", controller.infoSession);
//router.post("/logout", controller.logout);

router.get("/logout", (req, res) => {
  res.clearCookie("connect.sid");
  req.logout((err) => {
    if (err) res.send(err);
  });
  res.redirect("/vistas");
});

router.get(
  "/register-github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/profile",
  passport.authenticate("github", { scope: ["user:email"] }),
  controller.githubResponse
);

export default router;
