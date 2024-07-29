import { Router } from "express";
import * as controller from "../controllers/ticket.controller.js";
import { isAuth } from "../middlewares/validateLogin.js";
const router = Router();

router.post("/purchase", [isAuth], controller.create);

export default router;
