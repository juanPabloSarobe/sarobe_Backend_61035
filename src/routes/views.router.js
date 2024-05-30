import { Router } from "express";

const router = Router();
import * as controller from "../services/product.services.js";

router.get("/", (req, res) => {
  res.render("vista1", { layout: "main2.handlebars" });
});

router.get("/v2", (req, res) => {
  const user = {
    firstName: "Juan",
    lastName: "Sarobe",
  };
  res.render("vista2", { user });
});

router.get("/home", async (req, res) => {
  try {
    const productos = await controller.getAllWebSocket();

    res.render("home", { productos });
  } catch (error) {
    res.render("error");
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realTimeProducts");
  } catch (error) {
    res.render("error");
  }
});

export default router;
