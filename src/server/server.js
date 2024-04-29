import { ProductManager } from "../manager/product.manager.js";
import express from "express";

const app = express();

app.use(express.json());

const productos = new ProductManager("./products.json");

app.get("/home", async (req, res) => {
  res.send(await productos.getProducts());

  // res.json(products)
  // res.redirect('/home')
  // res.render()
  // res.status(404).json({msg: 'Error, no podes ingresar'})
});

app.get("/products", async (req, res) => {
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

app.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const products = await productos.getProductById(pid);

    if (products) res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.get("/productsByCategory/:category", async (req, res) => {
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

app.post("/products", async (req, res) => {
  try {
    const product = await productos.addProduct(req.body);
    if (!product) res.status(400).json({ msj: "Bad request" });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.put("/products", async (req, res) => {
  //Falta terminar el /:pid
  try {
    const product = await productos.updateProduct(req.body);
    if (!product) res.status(400).json({ msj: "Bad request" });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
app.delete("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productos.deleteProduct(pid);
    if (!product) res.status(400).json({ msj: "Bad request" });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok en puerto ${PORT}`));
