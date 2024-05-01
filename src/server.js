import express from "express";
import productRouter from "./routes/products.router.js ";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname + "/public");
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/products", productRouter);

const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok en puerto ${PORT}`));
