import * as service from "../services/cart.services.js";
import { pResp } from "../utils.js";

export const getAll = async (req, res, next) => {
  try {
    const carts = await service.getAll();
    pResp(res, 200, carts);
  } catch (error) {
    next(error.message);
  }
};

export const getById = async (req, res, next) => {
  try {
    const cid = req.session?.message?.cart;
    const cart = await service.getById(cid);
    if (!cart) pResp(res, 404, { msg: "cart not found" });
    else pResp(res, 200, cart);
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    const cart = await service.create(req.body);
    if (!cart) pResp(res, 404, { msg: "Bad request" });
    pResp(res, 200, cart);
  } catch (error) {
    next(error.message);
  }
};
export const addProduct = async (req, res, next) => {
  try {
    const cid = req.session?.message?.cart;
    const { pid } = req.params;
    let { quantity } = req.body;
    if (!quantity) quantity = 1;
    const cart = await service.addProduct(cid, pid, quantity);
    if (!cart) pResp(res, 404, { msg: "Bad request" });
    pResp(res, 200, cart);
  } catch (error) {
    next(error.message);
  }
};

export const delProduct = async (req, res, next) => {
  try {
    const cid = req.session?.message?.cart;
    const { pid } = req.params;
    const cart = await service.delProduct(cid, pid);
    if (!cart) pResp(res, 404, { msg: "Bad request" });
    pResp(res, 200, cart);
  } catch (error) {
    next(error.message);
  }
};

export const remove = async (req, res, next) => {
  try {
    const cid = req.session?.message?.cart;
    return pResp(res, 404, { msg: "delete function disabled" });
    const cart = await service.remove(cid);
    if (!cart) res.status(404).json({ msj: "Error removing cart" });
    else pResp(res, 201, cart);
  } catch (error) {
    next(error.message);
  }
};
export const cleanCart = async (req, res, next) => {
  try {
    const cid = req.session?.message?.cart;
    const cart = await service.cleanCart(cid);
    if (!cart) res.status(404).json({ msj: "Error cleaning cart" });
    else pResp(res, 201, cart);
  } catch (error) {
    next(error.message);
  }
};
