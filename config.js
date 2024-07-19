import dotenv from "dotenv";

const ENV = process.argv.slice(2)[0]; //si quiero tener multiples .env para distintos entornos
const PERSISTENCE = process.argv.slice(2)[1];

//ejemplo, no aplicado en este proyecto.
dotenv.config({ path: ENV === "prod" ? ".env.prod" : "./.env.dev" });

export default {
  NODE_ENV: ENV,
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  PERSISTENCE: PERSISTENCE,
};
