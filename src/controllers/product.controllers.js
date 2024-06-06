import * as service from "../services/product.services.js";
import { __dirname } from "../utils.js";

export const getAll = async (req, res, next) => {
  try {
    const { title, page, limit, sort } = req.query;
    const hasTitle = title ? `&title=${title}` : "";
    const hasSort = sort ? `&sort=${sort}` : "";
    let products = await service.getAll(title, page, limit, sort);

    const nextLink = products.hasNextPage
      ? `http://localhost:8080/products?limit=${products.limit}&page=${products.nextPage}${hasTitle}${hasSort}`
      : null;
    const prevLink = products.hasPrevPage
      ? `http://localhost:8080/products?limit=${products.limit}&page=${products.prevPage}${hasTitle}${hasSort}`
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
    else res.status(200).json(product);
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
      ? `http://localhost:8080/products/cat?limit=${products.limit}&page=${products.nextPage}${hasCategory}${hasSort}${hasStock}`
      : null;
    const prevLink = products.hasPrevPage
      ? `http://localhost:8080/products/cat?limit=${products.limit}&page=${products.prevPage}${hasCategory}${hasSort}${hasStock}`
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
