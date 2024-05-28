import * as service from "../services/product.services.js";

export const getAll = async (req, res, next) => {
  try {
    let products = await service.getAll();
    const { title, limit } = req.query;

    if (title) {
      const filterItems = (title) => {
        return products.filter(
          (el) => el.title.toLowerCase().indexOf(title.toLowerCase()) > -1
        );
      };
      products = filterItems(title);
    }
    if (limit) {
      const limitedItems = products.splice(0, parseInt(limit));

      products = limitedItems;
    }

    res.status(200).json(products);
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
    const { category } = req.params;

    if (category) {
      const products = await service.getByCategory(category);
      if (products.length === 0)
        res.status(404).json({ msg: `category ${category} not found` });
      else res.status(200).json(products);
    }
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
