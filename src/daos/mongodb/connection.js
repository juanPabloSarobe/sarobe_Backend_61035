import mongoose from "mongoose";
import "dotenv/config";
import { logger } from "../../utils/logger.js";

const connectionString = process.env.MONGO_URL || "mongodb://localhost:27017/";

export const initMongoDB = async () => {
  try {
    await mongoose.connect(connectionString);
    logger.info("conectado a mongo Atlas");
  } catch (error) {
    logger.error(error);
  }
};
