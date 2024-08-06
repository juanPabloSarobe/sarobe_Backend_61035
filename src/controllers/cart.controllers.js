import * as service from "../services/cart.services.js";
import UserRepository from "../repository/user.repository.js";
import { httpResponse } from "../utils/httpResponse.js";
const userRepository = new UserRepository();

export const getAll = async (req, res, next) => {
  try {
    const carts = await service.getAll();
    httpResponse.Ok(res, carts);
  } catch (error) {
    next(error.message);
  }
};

export const getById = async (req, res, next) => {
  try {
    const cid = req.session?.message?.cart;
    const cart = await service.getById(cid);
    if (!cart) httpResponse.NotFound(res, cart, "cart not found");
    else httpResponse.Ok(res, cart);
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    const cart = await service.create(req.body);
    if (!cart) httpResponse.NotFound(res, cart, "bad request");
    httpResponse.Ok(res, cart);
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
    if (!cart) httpResponse.NotFound(res, cart, "bad request");
    httpResponse.Ok(res, cart);
  } catch (error) {
    next(error.message);
  }
};

export const delProduct = async (req, res, next) => {
  try {
    const cid = req.session?.message?.cart;
    const { pid } = req.params;
    const cart = await service.delProduct(cid, pid);
    if (!cart) httpResponse.NotFound(res, cart, "bad request");
    httpResponse.Ok(res, cart);
  } catch (error) {
    next(error.message);
  }
};

export const remove = async (req, res, next) => {
  try {
    const cid = req.session?.message?.cart;
    return httpResponse.NotFound(res, cid, "delete function disabled");
    /*  const cart = await service.remove(cid);
    if (!cart) httpResponse.NotFound(res, cart, "Error removing cart");
    else httpResponse.Ok(res, cart); */
  } catch (error) {
    next(error.message);
  }
};
export const cleanCart = async (req, res, next) => {
  try {
    const cid = req.session?.message?.cart;
    const cart = await service.cleanCart(cid);
    if (!cart) httpResponse.NotFound(res, cart, "Error cleaning cart");
    else httpResponse.Ok(res, cart);
  } catch (error) {
    next(error.message);
  }
};
