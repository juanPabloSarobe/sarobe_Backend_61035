import { Router } from "express";

const router = Router();
import { ProductManager } from "../manager/product.manager.js";

const products = new ProductManager("./src/data/products.json");

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
    const productos = await products.getProducts();
    res.render("home", { productos });
  } catch (error) {
    res.render("error");
  }
});

export default router;
