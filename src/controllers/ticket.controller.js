import { v4 as uuidv4 } from "uuid";
import * as services from "../services/ticket.services.js";
import { getUserById } from "../services/user.services.js";
import { getById } from "../services/product.services.js";
import { pResp } from "../utils.js";
import { cleanCart } from "./cart.controllers.js";
import UserRepository from "../repository/user.repository.js";
const userRepository = new UserRepository();

export const getTicketById = async (req, res, next) => {
  try {
    const userId = req.session.passport?.user;
    const tickets = await services.getById(userId);
    if (!tickets) pResp(res, 404, { msg: "bad Request" });
    pResp(res, 200, tickets);
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    const userId = req.session.passport?.user;
    let cart;
    if (userId) {
      const user = await userRepository.getUserById(userId);
      cart = { ...user.cart._doc };
    }

    const code = uuidv4();
    const purchase_datetime = new Date().toLocaleString();

    let amount = 0;
    if (cart.products.length > 0) {
      for (const product of cart.products) {
        const prodId = product.product;
        const prodInList = await getById(prodId);
        if (product.quantity <= prodInList.stock) {
          const subtotal = product.quantity * prodInList.price;
          product._doc.price = prodInList.price;
          product._doc.subtotal = subtotal;
          amount += subtotal;
        } else {
          const subtotal = prodInList.stock * prodInList.price;
          product._doc.price = prodInList.price;
          product._doc.subtotal = subtotal;
          amount += subtotal;
        }
      }
    } else {
      return pResp(res, 404, { msg: "empty cart" });
    }
    let preTicket = {
      code,
      purchase_datetime,
      amount,
      purchaser: req.session.message?.email,
      products: cart.products,
      userId,
    };

    const ticket = await services.create(preTicket);
    if (!ticket) {
      pResp(res, 404, { msg: "Bad Request" });
    } else {
      cleanCart(req, res, next);
      pResp(res, 200, { ticket: ticket });
    }
  } catch (error) {
    next(error.message);
  }
};
