import { Router } from "express";
const router = Router();

import { ProductManager } from "../manager/product.manager.js";

const productos = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
  try {
    let products = await productos.getProducts();
    const { title, limit } = req.query;

    if (title) {
      const filterItems = (title) => {
        return products.filter(
          (el) => el.title.toLowerCase().indexOf(title.toLowerCase()) > -1
        );
      };
      products = filterItems(title);
    }
    if (limit) {
      const limitedItems = products.splice(0, parseInt(limit));

      products = limitedItems;
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const products = await productos.getProductById(pid);

    if (products) res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.get("/category/:category", async (req, res) => {
  try {
    const products = await productos.getProducts();
    const { category } = req.params;

    if (category) {
      const filterCategory = products.filter((e) => {
        return e.category.toLowerCase() === category.toLowerCase().toString();
      });
      if (filterCategory.length !== 0) {
        res.status(200).json(filterCategory);
      } else {
        throw new Error("Invalid category");
      }
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await productos.addProduct(req.body);
    if (!product) res.status(400).json({ msj: "Bad request" });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put("/", async (req, res) => {
  //Falta terminar el /:pid
  try {
    const product = await productos.updateProduct(req.body);
    if (!product) res.status(400).json({ msj: "Bad request" });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productos.deleteProduct(pid);
    if (!product) res.status(400).json({ msj: "Bad request" });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
