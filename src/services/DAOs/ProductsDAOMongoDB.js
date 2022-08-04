import { ProductsDAO } from "./ProductsDAO.js";
import { ProductsModel } from "../../models/product.model.js";
import { logger } from "../../logger/logger.js";

export class ProductsDAOMongoDB extends ProductsDAO{

    //Singleton.
    static instance;
    constructor() {
        super();
        if (!ProductsDAOMongoDB.instance) { //1. Si la instancia aún no existe, la creamos.
            this.model = ProductsModel;
            ProductsDAOMongoDB.instance = this; //Crear la instancia.
        } 
        else { //2. Si la instancia existe, devolver la primera instancia.
            return ProductsDAOMongoDB.instance;
        }
    };

    async save(product){
        try{
            if(typeof product == "object"){
                const response = await this.model.create(product);
                return {msg: `Se ha agregado correctamente el producto ${response.name}.`}
            }
            else{
                return {error: "No se ha podido crear el producto. Vuelta a intentarlo."}
            }
        }
        catch(error){
            logger.error(error)
        }
    };

    async getById(id){
        try{
            const product = await this.model.findOne({_id: id});
            console.log(product);
            if(product._id == id){
                return product
            }
            else{
                return {error: `No se ha encontrado un producto con el ID ${id}.`}
            }
        }
        catch(error){
            logger.error(error)
        }
    };

    async getAll(){
        try{
            const products = await this.model.find();
            if(products.length > 0){
                return products
            }
            else{
                return {error: `No hay productos en la BBDD.`}
            }
        }
        catch(error){
            logger.error(error)
        }
    };

    async deleteById(id){
        try{
            const response = await this.model.deleteOne({_id: id});
            if(response.deletedCount === 1){
                return {msg: `Se ha borrado el producto con el ID ${id}.`}
            }
            else{
                return {error: `No se ha encontrado un producto con el ID ${id}, por ende, no se ha podido borrar.`}
            }
        }
        catch(error){
            logger.error(error)
        }
    };

    async updateById(id, newData){
        try{
            const response = await this.model.updateOne({_id: id}, newData);
            if(response.matchedCount === 1){
                return {msg: `Se ha actualizado el item con el ID ${id}.`}
            }
            else{
                return {error: `No se ha encontrado un item con el ID ${id}, por ende, no se ha podido actualizar.`}
            }
        }
        catch(error){
            logger.error(error)
        }
    };

};