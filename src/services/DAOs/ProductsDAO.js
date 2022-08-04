export class ProductsDAO { //Plantilla que permite asegurar que tengamos las siguientes funcionalidades en las clases que se extienden a partir de esta.
    
    async save(product) {
        throw new Error('¡Falta implementar add!');
    };

    async getById(id) {
        throw new Error('¡Falta implementar getById!');
    };

    async getAll() {
        throw new Error('¡Falta implementar getAll!');
    };

    async deleteById(id) {
        throw new Error('¡Falta implementar deleteById!');
    };

    async updateById(id, newData) {
        throw new Error('¡Falta implementar updateById!');
    };

};