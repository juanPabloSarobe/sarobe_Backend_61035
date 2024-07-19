import * as service from "../services/product.services.js";
//import { __dirname } from "../utils.js";

export const getAll = async (req, res, next) => {
  try {
    console.log("getAll");
    const { title, page, limit, sort } = req.query;
    const hasTitle = title ? `&title=${title}` : "";
    const hasSort = sort ? `&sort=${sort}` : "";
    let products = await service.getAll(title, page, limit, sort);
    console.log(products);
    const nextLink = products.hasNextPage
      ? `http://localhost:8080/api/products?limit=${products.limit}&page=${products.nextPage}${hasTitle}${hasSort}`
      : null;
    const prevLink = products.hasPrevPage
      ? `http://localhost:8080/api/products?limit=${products.limit}&page=${products.prevPage}${hasTitle}${hasSort}`
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

    if (!products) res.status(404).json({ msg: "product not found" });
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await service.getById(pid);
    if (!product) res.status(404).json({ msg: "product not found" });
    else {
      testCookies(req, res, product);
      res.status(200).json(product);
    }
  } catch (error) {
    next(error.message);
  }
};

export const getByCategory = async (req, res, next) => {
  try {
    const { category, stock, page, limit, sort } = req.query;
    const hasCategory = category ? `&category=${category}` : "";
    const hasStock = stock ? `&stock=${stock}` : "";
    const hasSort = sort ? `&sort=${sort}` : "";
    const products = await service.getByCategory(
      category,
      stock,
      page,
      limit,
      sort
    );
    const nextLink = products.hasNextPage
      ? `http://localhost:8080/api/products/cat?limit=${products.limit}&page=${products.nextPage}${hasCategory}${hasSort}${hasStock}`
      : null;
    const prevLink = products.hasPrevPage
      ? `http://localhost:8080/api/products/cat?limit=${products.limit}&page=${products.prevPage}${hasCategory}${hasSort}${hasStock}`
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

    if (!products) res.status(404).json({ msg: "product not found" });
    else res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    const product = await service.create(req.body);
    if (!product) res.status(404).json({ msj: "Bad request" });
    res.status(201).json(product);
  } catch (error) {
    next(error.message);
  }
};
export const update = async (req, res, next) => {
  try {
    const { pid } = req.params;

    const product = await service.update(pid, req.body);
    if (!product) res.status(404).json({ msj: "Error update product" });
    else res.status(201).json(product);
  } catch (error) {
    next(error.message);
  }
};
export const remove = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await service.remove(pid);
    if (!product) res.status(404).json({ msj: "Error removing product" });
    else res.status(201).json(product);
  } catch (error) {
    next(error.message);
  }
};

const testCookies = (req, res, product) => {
  //Test de cookies
  //con el response (res) las seteamos y con request (req) las obtenemos
  res.cookie("product", product.title); // El servidor almacena una cookie en el front
  res.cookie("price", product.price, { maxAge: 3000 }); // El servidor almacena una cookie en el front
  res.cookie("stock", product.stock, { signed: true, maxAge: 10000 }); // El servidor almacena una cookie en el front
  res.cookie("description", product.description, {
    signed: true,
    httpOnly: true,
  }); // El servidor almacena una cookie en el front
  const cookies = req.cookies;
  console.log(cookies); // el servidor recibe una cookie desde el front
  console.log(req.signedCookies); // el servidor recibe una cookie signed desde el front
  //res.clearCookie("product");  // se utiliza para eliminar una cookie, si no sabemos las cookies, utilizamos el metodo Object.keys para obtener los nombres de todas las cookies
  //Fin test cookies
};
