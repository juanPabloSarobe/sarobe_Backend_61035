import express from "express";
import productRouter from "./routes/products.router.js ";
import chartRouter from "./routes/charts.router.js";
import viewsRouter from "./routes/views.router.js";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { ProductManager } from "./manager/product.manager.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { initMongoDB } from "./daos/mongodb/connection.js";

const productos = new ProductManager(`${__dirname}/data/products.json`);

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//iniciamos la librería handlebars, siempre van estas 3 lineas
app.engine("handlebars", handlebars.engine());
//pasamos la carpeta donde va a tomar las vistas
app.set("views", __dirname + "/views");
//pasamos la configuración seteamos el motor de plantillas a utilizar
app.set("view engine", "handlebars");

app.use("/products", productRouter);
app.use("/charts", chartRouter);
app.use("/vistas", viewsRouter);
app.use(errorHandler);

initMongoDB();

const PORT = 8080;
const httpServer = app.listen(PORT, () =>
  console.log(`Server ok en puerto ${PORT}`)
);

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log(`Usuario ${socket.id} conectado`);
  socket.on("disconnect", () => {
    console.log(`usuario ${socket.id} desconectado`);
  });

  socket.emit("saludosDesdeBack", "Bienvenido a websocket");
  socket.on("respuestaDesdeFront", (resp) => {
    console.log(resp);
  });

  socket.emit("products", await productos.getProducts());
});
