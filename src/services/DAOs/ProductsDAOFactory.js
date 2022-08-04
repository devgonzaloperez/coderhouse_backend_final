import { ProductsDAOFile } from "./ProductsDAOFile.js";
import { ProductsDAOMongoDB } from "./ProductsDAOMongoDB.js";

const option = process.argv[2] || "";

let dao;

switch (option){
  case "mongo":
    dao = new ProductsDAOMongoDB();
    dao.init();
    break;
  case "file":
    dao = new ProductsDAOFile();
    dao.init();
    break;
  default:
    dao = new ProductsDAOMongoDB();
};

export class ProductsDAOFactory{
  static getDao(){return dao};
};