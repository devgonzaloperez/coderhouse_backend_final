import fs from 'fs';
import { ProductsDAO } from './ProductsDAO.js';

export class ProductsDAOFile extends ProductsDAO{

    //Singleton.
    static instance;
    constructor() {
        super();
        if (!ProductsDAOFile.instance) { //1. Si la instancia aún no existe, la creamos.
            this.fileName = "../db/products.txt";
            ProductsDAOFile.instance = this; //Crear la instancia.
        } 
        else { //2. Si la instancia existe, devolver la primera instancia.
            return ProductsDAOFile.instance;
        }
    };

    async save(product){
        try{
            if(typeof product == "object"){
                const itemsFromDB = await fs.promises.readFile(this.fileName);
                const itemsFromDBParsed = await JSON.parse(itemsFromDB);
                const itemsAndNewObject = [...itemsFromDBParsed, {...product}]
                await fs.promises.writeFile(this.fileName, JSON.stringify(itemsAndNewObject));
                console.log(`Se ha guardado el item ${product.title} correctamente.`)
                return {msg: `Se ha agregado correctamente el producto ${product.title} con el ID ${product.id}.`}
            }
            else{
                return {error: "No se ha podido crear el producto. Vuelta a intentarlo."}
            }
        }
        catch(error){
            console.log(error)
        }

    };

    async getById(id){
        try{
            const itemsFromDB = await fs.promises.readFile(this.fileName);
            const itemsFromDBParsed = await JSON.parse(itemsFromDB);
            const itemSelectedByIdFromDBParsed = await itemsFromDBParsed.filter(item => item.id === parseInt(id));
            if(itemSelectedByIdFromDBParsed[0]){
                console.log(`Se ha seleccionado un item.`)
                return itemSelectedByIdFromDBParsed
            }
            else{
                return {error: `No se ha encontrado un producto con el ID ${id}.`}
            }
        }
        catch(error){
            console.log(error)
        }

    };

    async getAll(){
        try{
            const itemsFromDB = await fs.promises.readFile(this.fileName);
            const itemsFromDBParsed = await JSON.parse(itemsFromDB);
            if(itemsFromDBParsed && itemsFromDBParsed.length > 0){
                return itemsFromDBParsed
            }
            else{
                return {error: `No hay productos en la BBDD.`}
            }
        }
        catch(error){
            console.log(error)
        }
    };

    async deleteById(id){
        try{
            const itemsFromDB = await fs.promises.readFile(this.fileName);
            const itemsFromDBParsed = await JSON.parse(itemsFromDB);
            const itemsFromDBParsedWithoutItemDeleted = await itemsFromDBParsed.filter(item => item.id !== parseInt(id));
            if(itemsFromDBParsed.length !== itemsFromDBParsedWithoutItemDeleted.length){
                await fs.promises.writeFile(this.fileName, JSON.stringify(itemsFromDBParsedWithoutItemDeleted));
                return {msg: `Se ha borrado el item con el ID ${id}.`}
            }
            else{
                return {error: `No se ha encontrado un item con el ID ${id}, por ende, no se ha podido borrar.`}
            }
        }
        catch(error){
            console.log(error)
        }
    };

};