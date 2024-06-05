import * as service from "../services/chart.services.js";

export const getAll = async (req, res, next) => {
  try {
    const charts = await service.getAll();
    res.status(200).json(charts);
  } catch (error) {
    next(error.message);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const chart = await service.getById(cid);
    if (!chart) res.status(404).json({ msg: "chart not found" });
    else res.status(200).json(chart);
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    console.log("req.body:", req.body);
    const chart = await service.create(req.body);
    console.log("chart.controller: ", chart);
    if (!chart) res.status(400).json({ msg: "Bad request" });
    res.status(200).json(chart);
  } catch (error) {
    next(error.message);
  }
};
export const addProduct = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    let { quantity } = req.body;

    if (!quantity) quantity = 1;

    const chart = await service.addProduct(cid, pid, quantity);
    if (!chart) res.status(400).json({ msg: "Bad request" });
    res.status(200).json(chart);
  } catch (error) {
    next(error.message);
  }
};
export const addManyProduct = async (req, res, next) => {
  try {
    const { cid } = req.params;
    let { products } = req.body;
    console.log("re.body: ", req.body);
    console.log("products: ", products);
    const chart = await service.addManyProduct(cid, req.body);
    if (!chart) res.status(400).json({ msg: "Bad request" });
    res.status(200).json(chart);
  } catch (error) {
    next(error.message);
  }
};

export const delProduct = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;

    const chart = await service.delProduct(cid, pid);
    if (!chart) res.status(400).json({ msg: "Bad request" });
    res.status(200).json(chart);
  } catch (error) {
    next(error.message);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const chart = await service.remove(cid);
    if (!chart) res.status(404).json({ msj: "Error removing chart" });
    else res.status(201).json(chart);
  } catch (error) {
    next(error.message);
  }
};
