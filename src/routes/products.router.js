import { Router } from "express";
import * as controller from "../controllers/product.controllers.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuth } from "../middlewares/validateLogin.js";
const router = Router();

router.get("/", controller.getAll);
router.get("/cat", controller.getByCategory);

router.get("/:pid", controller.getById);

router.post("/", [isAuth, isAdmin], controller.create);

router.put("/:pid", [isAuth, isAdmin], controller.update);
router.delete("/:pid", [isAuth, isAdmin], controller.remove);

export default router;
