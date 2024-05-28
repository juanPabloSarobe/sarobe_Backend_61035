import mongoose from "mongoose";
import "dotenv/config";

const connectionString = process.env.MONGO_URL || "mongodb://localhost:27017/";

export const initMongoDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("conectado a mongo Atlas");
  } catch (error) {
    console.log(error);
  }
};
