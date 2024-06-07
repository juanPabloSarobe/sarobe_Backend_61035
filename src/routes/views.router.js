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
router.get("/products", async (req, res) => {
  try {
    const { title, page, limit, sort } = req.query;
    const hasTitle = title ? `&title=${title}` : "";
    const hasSort = sort ? `&sort=${sort}` : "";
    const products = await controller.getAllWebSocketPaginated(
      title,
      page,
      limit,
      sort
    );

    const nextLink = products.hasNextPage
      ? `http://localhost:8080/vistas/products?limit=${products.limit}&page=${products.nextPage}${hasTitle}${hasSort}`
      : null;
    const prevLink = products.hasPrevPage
      ? `http://localhost:8080/vistas/products?limit=${products.limit}&page=${products.prevPage}${hasTitle}${hasSort}`
      : null;
    const response = {
      payload: products.docs,
      info: {
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink,
        nextLink,
      },
    };
    const { info } = response;
    const productosArr = [...products.docs];
    let productos = [];
    productosArr.forEach((element) => {
      const producto = {
        title: element.title,
        description: element.description,
        price: element.price,
        stock: element.stock,
        img: element.img,
      };
      productos.push(producto);
    });

    res.render("products", { productos, info });
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
