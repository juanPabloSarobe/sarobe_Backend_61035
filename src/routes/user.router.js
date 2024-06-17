import { Router } from "express";
import { isLogued } from "../middlewares/validateLogin.js";
import * as controller from "../controllers/user.controllers.js";
import passport from "passport";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register"),
  controller.register
);
router.post("/login", passport.authenticate("login"), controller.login);
router.get("/info", controller.infoSession);
router.post("/logout", controller.logout);

export default router;
