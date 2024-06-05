import { Router } from "express";
import * as controller from "../controllers/chart.controllers.js";
const router = Router();

router.get("/", controller.getAll);

router.get("/:cid", controller.getById);

router.post("/", controller.create);

router.put("/:cid/products/:pid", controller.addProduct);

router.put("/:cid", controller.addManyProduct);

router.delete("/:cid/products/:pid", controller.delProduct);

router.delete("/:cid", controller.remove); //elimina el carrito completo

router.delete("/cleanCart/:cid", controller.cleanCart); //vacia el carrito

export default router;
