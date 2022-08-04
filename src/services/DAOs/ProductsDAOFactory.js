import Yargs from 'yargs';
import { ProductsDAOFile } from "./ProductsDAOFile.js";
import { ProductsDAOMongoDB } from "./ProductsDAOMongoDB.js";

const yargs = Yargs(process.argv.slice(2)).argv;
const persistence = yargs.persistence || "";
let dao;


switch (persistence){
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