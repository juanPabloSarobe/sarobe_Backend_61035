import { ProductManager } from "../manager/product.manager.js";
import express from "express";

const app = express();

app.use(express.json());

const productos = new ProductManager("./products.json");

app.get("/home", async (req, res) => {
  res.send(await productos.getProducts());
  console.log(await productos.getProducts());
  // res.json(products)
  // res.redirect('/home')
  // res.render()
  // res.status(404).json({msg: 'Error, no podes ingresar'})
});

app.get("/products", async (req, res) => {
  try {
    let products = await productos.getProducts();
    const { title, limit } = req.query;
    console.log(title);
    if (title) {
      const filterItems = (title) => {
        return products.filter(
          (el) => el.title.toLowerCase().indexOf(title.toLowerCase()) > -1
        );
      };
      products = filterItems(title);
    }
    if (limit) {
      console.log(products);
      const limitedItems = products.splice(0, parseInt(limit));
      console.log(limitedItems);
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

    if (!products) {
      res.status(400).json({
        msj: `ERROR ID NOT FOUND. El id ${pid} ingresado no es un id valido`,
      });
    } else res.status(200).json(products);
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
        res.status(400).json({ msj: "Categoría Invalida" });
      }
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

const PORT = 8081;

app.listen(PORT, () => console.log(`Server ok en puerto ${PORT}`));
