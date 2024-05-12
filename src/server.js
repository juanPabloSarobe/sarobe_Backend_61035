import express from "express";
import productRouter from "./routes/products.router.js ";
import chartRouter from "./routes/charts.router.js";
import viewsRouter from "./routes/views.router.js";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRouter);
app.use("/charts", chartRouter);

//iniciamos la librería handlebars, siempre van estas 3 lineas
app.engine("handlebars", handlebars.engine());
//pasamos la carpeta donde va a tomar las vistas
app.set("views", __dirname + "/views");
//pasamos la configuración seteamos el motor de plantillas a utilizar
app.set("view engine", "handlebars");

app.use("/vistas", viewsRouter);
const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok en puerto ${PORT}`));
