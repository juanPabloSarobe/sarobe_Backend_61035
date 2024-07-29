import persistence from "../daos/factory.js";
const { ticketDao } = persistence;

export const create = async (ticket) => {
  try {
    return await ticketDao.create(ticket);
  } catch (error) {
    throw new Error(error);
  }
};
