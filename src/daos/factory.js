import ProductDaoMongo from "./mongodb/product.dao.js";
import ProductDaoFS from "./filesystem/product.dao.js";
import ChartDaoMongoDB from "./mongodb/chart.dao.js";
import UserDaoMongo from "./mongodb/user.dao.js";
import { initMongoDB } from "./mongodb/connection.js";

let prodDao = null;
let userDao = null;
let cartDao = null;

let persistence = process.argv[2];

switch (persistence) {
  case "fs":
    console.log(persistence);
    prodDao = new ProductDaoFS("./src/data/products.json");

    // userDao = new UserDaoFS('./src/daos/....
    // cartDao = new
    break;
  case "mongo":
    initMongoDB();
    userDao = new UserDaoMongo();
    prodDao = new ProductDaoMongo();
    cartDao = new ChartDaoMongoDB();
    break;
  // case 'sql':
  //     userDao = new UserDaoSql();
  //     prodDao = new ProductDaoSql();
  //     cartDao = new CartDaoSqlDB();
  default:
    prodDao = new ProductDaoFS("./src/data/products.json");
    // userDao = new UserDaoFS('./src/daos/....
    // cartDao = new
    break;
}

export default { userDao, prodDao, cartDao };