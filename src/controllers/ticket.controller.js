import { v4 as uuidv4 } from "uuid";
import * as services from "../services/ticket.services.js";
import { getUserById } from "../services/user.services.js";
import { getById } from "../services/product.services.js";
import { pResp } from "../utils.js";
import { cleanCart } from "./cart.controllers.js";

export const create = async (req, res, next) => {
  try {
    const userId = req.session.passport?.user;
    const cart = req.session.message?.cart;
    const cartId = cart._id;
    const code = uuidv4();
    const purchase_datetime = new Date().toLocaleString();
    console.log(purchase_datetime);
    let amount = 0;
    if (cart.products.length > 0) {
      for (const product of cart.products) {
        const prodId = product.product;
        const prodInList = await getById(prodId);
        if (product.quantity <= prodInList.stock) {
          const subtotal = product.quantity * prodInList.price;
          amount += subtotal;
        } else {
          const subtotal = prodInList.stock * prodInList.price;
          amount += subtotal;
        }
      }
    }
    const preTicket = {
      code,
      purchase_datetime,
      amount,
      purchaser: req.session.message?.email,
      cart: cartId,
      userId,
    };
    console.log(preTicket);

    const ticket = await services.create({
      code,
      purchase_datetime,
      amount,
      purchaser: req.session.message?.email,
      cart: cartId,
      userId,
    });
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
