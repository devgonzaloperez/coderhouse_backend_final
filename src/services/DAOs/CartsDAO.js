export class CartsDAO{ //Plantilla que permite asegurar que tengamos las siguientes funcionalidades en las clases que se extienden a partir de esta.
    
    async saveCart(cart) {
        throw new Error('¡Falta implementar saveCart!');
    };

    async deleteCartById(id) {
        throw new Error('¡Falta implementar deleteCartById!');
    };

    async getAllCartProductsByID(id) {
        throw new Error('¡Falta implementar getAllCartProductsByID!');
    };


    async addProductByIDtoCartByID(id, id_prod) {
        throw new Error('¡Falta implementar addProductByIDtoCartByID!');
    };


    async deleteProductByIDFromCartByID(id, id_prod) {
        throw new Error('¡Falta implementar deleteProductByIDFromCartByID!');
    };

};