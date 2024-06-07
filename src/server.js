import express from "express";
import productRouter from "./routes/products.router.js ";
import chartRouter from "./routes/charts.router.js";
import viewsRouter from "./routes/views.router.js";
import chatRouter from "./routes/chats.router.js";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { errorHandler } from "./middlewares/errorHandler.js";
import { initMongoDB } from "./daos/mongodb/connection.js";
import MessageManager from "./daos/mongodb/chat.dao.js";
import ProductsManager from "./daos/mongodb/product.dao.js";
import * as messageManager from "./services/chat.services.js";

//const messageManager = new MessageManager();
const products = new ProductsManager();
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//iniciamos la librería handlebars, siempre van estas 3 lineas
app.engine(
  "handlebars",
  handlebars.engine({
    allowedProtoProperties: true,
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
    allowedProtoMethods: true,
  })
);
//pasamos la carpeta donde va a tomar las vistas
app.set("views", __dirname + "/views");
//pasamos la configuración seteamos el motor de plantillas a utilizar
app.set("view engine", "handlebars");

app.use("/products", productRouter);
app.use("/charts", chartRouter);
app.use("/chats", chatRouter);
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
  socketServer.emit("messages", await messageManager.getAllMongo());

  socket.on("newUser", (user) => {
    console.log(`> ${user} ha iniciado sesión`);
    socket.broadcast.emit("newUser", user);
  });

  socket.on("chat:message", async (msg) => {
    await messageManager.createMsgMongo(msg);
    socketServer.emit("messages", await messageManager.getAllMongo());
  });

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });

  socket.emit("products", await products.getAllWebSocket());
  socket.on("productUpdate", async () => {
    socketServer.emit("products", await products.getAllWebSocket());
  });
});
