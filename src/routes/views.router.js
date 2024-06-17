import { Router } from "express";
import { isLogued, validateLogin } from "../middlewares/validateLogin.js";
const router = Router();
import * as controller from "../services/product.services.js";

router.get("/", isLogued, (req, res) => {
  const { error } = req.session;
  res.render("login", { error });
});

router.get("/error", isLogued, (req, res) => {
  const { error } = req.session;
  res.render("error", { error });
});

router.get("/register", isLogued, (req, res) => {
  const user = req.session.message;
  res.render("register", { user });
});
router.get("/profile", validateLogin, (req, res) => {
  const user = req.session.message;
  res.render("profile", { user });
});

router.get("/home", async (req, res) => {
  try {
    const productos = await controller.getAllWebSocket();
    res.render("home", { productos });
  } catch (error) {
    res.render("error");
  }
});
router.get("/products", validateLogin, async (req, res) => {
  try {
    const user = req.session.message;
    const { title, page, limit, sort } = req.query;
    const hasTitle = title ? `&title=${title}` : "";
    const hasSort = sort ? `&sort=${sort}` : "";
    const products = await controller.getAllWebSocketPaginated(
      title,
      page,
      limit,
      sort
    );
    const profileLink = `http://localhost:8080/vistas/profile`;
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

    res.render("products", { productos, info, user, profileLink });
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
