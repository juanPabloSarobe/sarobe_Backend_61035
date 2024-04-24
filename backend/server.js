import { ProductManager } from "../entregables/desafioClase6.js";
import express from "express";

const app = express();

const productos = new ProductManager("./products.json");

app.get("/home", async (req, res) => {
  await productos.addProduct(
    "Cerveza IPA",
    "Cerveza India Pale Ale, ligeramente amarga y aromática.",
    5.99,
    "https://res.cloudinary.com/dg8ndxl2y/image/upload/v1696104302/descarga_schjmg.jpg",
    "cervezas1001",
    5,
    "Cervezas"
  );
  res.send(await productos.getProducts());
  console.log(await productos.getProducts());
  // res.json(products)
  // res.redirect('/home')
  // res.render()
  // res.status(404).json({msg: 'Error, no podes ingresar'})
});

app.get("/products", async (req, res) => {
  const products = await productos.getProducts();
  const { title } = req.query;
  if (title) {
    const filterItems = (title) => {
      return products.filter(
        (el) => el.title.toLowerCase().indexOf(title.toLowerCase()) > -1
      );
    };
    return res.json(filterItems(title));
  }

  return res.json(await productos.getProducts());
});

app.get("/products/:category", async (req, res) => {
  const products = await productos.getProducts();
  const { category } = req.params;

  if (category) {
    const filterCategory = products.filter((e) => {
      return e.category.toLowerCase() === category.toLowerCase().toString();
    });
    if (filterCategory.length !== 0) {
      return res.json(filterCategory);
    } else {
      return res.send(`<h1>Categoría invalida</h1>`);
    }
  }
});

const PORT = 8081;

app.listen(PORT, () => console.log(`Server ok en puerto ${PORT}`));
