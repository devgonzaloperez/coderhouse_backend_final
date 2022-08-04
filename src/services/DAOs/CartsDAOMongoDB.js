import { CartsModel } from '../../models/cart.model.js';
import { CartsDAO } from './CartsDAO.js'

export class CartsDAOMongoDB extends CartsDAO{

    //Singleton.
    static instance;
    constructor() {
        super();
        if (!CartsDAOMongoDB.instance) { //1. Si la instancia aún no existe, la creamos.
            this.model = CartsModel;
            CartsDAOMongoDB.instance = this; //Crear la instancia.
        } 
        else { //2. Si la instancia existe, devolver la primera instancia.
            return CartsDAOMongoDB.instance;
        }
    };

    async saveCart(object){
        try{
            if(typeof object == "object"){
                const response = await this.model.create(object);
                return {msg: `Se ha creado y se ha guardado el carrito.`}
            }
            else{
                return {error: "No se ha podido crear el carrito. Vuelta a intentarlo."}
            }
        }
        catch(error){
            console.log(error)
        }
    }

    async deleteCartById(id){
        try{
            const response = await this.model.deleteOne({_id: id});
            if(response.deletedCount === 1){
                return {msg: `Se ha borrado el carrito con el ID ${id}.`}
            }
            else{
                return {error: `No se ha encontrado un carrito con el ID ${id}, por ende, no se ha podido borrar.`}
            }
        }
        catch(error){
            console.log(error)
        }
    }

    async getAllCartProductsByID(id){
        try{
            const cart = await this.model.findOne({_id: id});
            console.log(cart);
            if(cart.products.length === 0){
                return {msg: "El carrito está vacío."}
            }
            else if(cart.products.length > 0){
                return {msg: `Los productos del carrito son ${cart.products}.`}
            }
            else{
                return {error: `No se ha encontrado un carrito con el ID ${id}.`}
            }
        }
        catch(error){
            console.log(error)
        }

    }

    async addProductByIDtoCartByID(id, id_prod){
        try {
            
            //1. Obtener el carrito y el producto seleccionado para ver si existen.
            const cart = await this.model.findOne({_id: id});
            const product = await ProductsModel.findOne({_id: id_prod});

            //2. Validar los datos obtenidos en (1).
            if(cart._id == id && product._id == id_prod){
                //2. Agregar al carrito seleccionado el producto seleccionado.
                const cartToUpdate = await this.model.updateOne({_id: id}, {$push: {products: product}});
                if(cartToUpdate.matchedCount === 1){
                    return {msg: `Se ha agregado el producto ${product.name} al carrito.`}
                };
            }
            else{
                return {error: `No se ha encontrado el carrito o el producto seleccionado.`}
            }            
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductByIDFromCartByID(id, id_prod){
        try {
            
            //1. Obtener el carrito y el producto seleccionado para ver si existen.
            const cart = await this.model.findOne({_id: id});
            const product = await ProductsModel.findOne({_id: id_prod});

            //2. Validar los datos obtenidos en (1).
            if(cart._id == id && product._id == id_prod){
                //2. Eliminar del carrito seleccionado el producto seleccionado.
                const cartToUpdate = await this.model.updateOne({_id: id}, {$pull: {products: product}});
                console.log(cartToUpdate);
                if(cartToUpdate.modifiedCount >= 1){
                    return {msg: `Se ha eliminado el producto ${product.name} del carrito.`}
                }
                else{
                    return {msg: `No se ha encontrado el producto ${product.name} en el carrito.`}
                }
            }
            else{
                return {error: `No se ha encontrado el carrito o el producto seleccionado.`}
            }            
        } catch (error) {
            console.log(error)
        }
    }
    
};