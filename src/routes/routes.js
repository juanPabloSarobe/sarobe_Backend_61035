import { Router } from "express";
import productRouter from "./products.router.js";
import userRouter from "./user.router.js";
import chartRouter from "./charts.router.js";
import viewsRouter from "./views.router.js";
import chatsRouter from "./chats.router.js";

export default class MainRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.use("/products", productRouter);
    this.router.use("/user", userRouter);
    this.router.use("/charts", chartRouter);
    this.router.use("/vistas", viewsRouter);
    this.router.use("/chats", chatsRouter);
  }

  getRouter() {
    return this.router;
  }
}
