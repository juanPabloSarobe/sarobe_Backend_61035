import express from "express";
import { __dirname } from "./utils/utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { errorHandler } from "./middlewares/errorHandler.js";
import ProductsManager from "./daos/mongodb/product.dao.js";
import * as messageManager from "./services/chat.services.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import "./passport/local-strategy.js";
import "./passport/github-strategy.js";
import MainRouter from "./routes/routes.js";
import config from "../config.js";
const mainRouter = new MainRouter();

const products = new ProductsManager();
const app = express();

//iniciamos el middleware de cookie parser
const SECRET = process.env.COOKIE_KEY;
app.use(cookieParser(SECRET)); //con esto queda disponible para utilizar en cualquier parte de la app
//fin inicio cookie parser

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Iniciamos la libreria express-sessions, es un middleware a nivel de aplicacion
// para utilizar cookies en sesiones debemos inicializar cookiesParser antes.
const SESSIONSECRET = process.env.SESSION_KEY;
const connectionString = process.env.MONGO_URL;
//para conectarnos a mongo loinicializamos con MongoStore.create y le pasamos los datos de configuracion
const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: connectionString,
    crypto: { secret: SESSIONSECRET },
    ttl: 360,
    reapInterval: 200,
  }),
  secret: SESSIONSECRET,
  cookie: { maxAge: 360000 },
  saveUninitialized: true,
  resave: true,
};
app.use(session(sessionConfig)); //con esto queda disponible para utilizar en cualquier parte de la app.

//Fin configuración de session

//iniciamos la librería handlebars, siempre van estas 3 lineas
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views"); //pasamos la carpeta donde va a tomar las vistas
app.set("view engine", "handlebars"); //pasamos la configuración seteamos el motor de plantillas a utilizar

//! ANTES DE LAS RUTAS - Inicializamos passport para estrategias de autenticación
app.use(passport.initialize());
app.use(passport.session());

//Enrutador
app.use("/api", mainRouter.getRouter());
app.use(errorHandler);

const PORT = config.PORT;
const httpServer = app.listen(PORT, () =>
  console.log(
    `Server ok en puerto ${PORT} in ${config.NODE_ENV} mode whit persistence in ${config.PERSISTENCE}`
  )
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
