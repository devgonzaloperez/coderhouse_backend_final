import { CartsDAOMongoDB } from "./CartsDAOMongoDB.js"; //En este caso, al haber solo un dao, siempre utilizo MongoDB, pero podría agregar otro DAO en un futuro.

const option = process.argv[2] || "";

let dao;

switch (option){
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