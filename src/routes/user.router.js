import { Router } from "express";
import { isAuth, isLogued } from "../middlewares/validateLogin.js";
import * as controller from "../controllers/user.controllers.js";
import passport from "passport";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register"),
  controller.register
);
router.post("/login", passport.authenticate("login"), controller.login);
router.get("/current", [isAuth], controller.current);
router.get("/infoSession", [isAuth, isAdmin], controller.infoSession);

router.get("/logout", [isAuth], controller.logout);

router.get(
  "/register-github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/profile",
  passport.authenticate("github", { scope: ["user:email"] }),
  controller.githubResponse
);

router.get("/send-reset-mail", [isAuth], controller.sendResetPassMail);
router.get("/getCookie", [isAuth], controller.getCookie);
router.patch("/update-password", [isAuth], controller.updatePass);

export default router;
