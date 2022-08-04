import Yargs from 'yargs';
import { CartsDAOMongoDB } from "./CartsDAOMongoDB.js"; //En este caso, al haber solo un dao, siempre utilizo MongoDB, pero podría agregar otro DAO en un futuro.

const yargs = Yargs(process.argv.slice(2)).argv;
const persistence = yargs.persistence || "";
let dao;

switch (persistence){
  case "mongo":
    dao = new CartsDAOMongoDB();
    dao.init();
    break;
  default:
    dao = new CartsDAOMongoDB();
};

export class CartsDAOFactory{
  static getDao(){return dao};
};