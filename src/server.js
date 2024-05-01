import express from "express";
import productRouter from "./routes/products.router.js ";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/products", productRouter);

const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok en puerto ${PORT}`));
