import '../configs/config.js';
import { ProductsDAOFactory } from '../services/DAOs/ProductsDAOFactory.js';
import { productsDTO } from '../services/DTOs/products.DTO.js';

const productsDAO = ProductsDAOFactory.getDao();

export const getAllProducts = async (req, res) =>{ //APLICAR DTO.
    const products = await productsDAO.getAll();
    if(products){
        const allProductsDTO = products.map((product) => productsDTO(product)); //En este caso, hay que mapearlo porque es un array y cada elemento debe ser pasado por el DTO. //TODO: Si no se devuelve un producto y se devuelve, por ejemplo, el mensaje, fallaría. APLICAR ERRORES SEGÚN CLASE 21. Try Catch.
        res.status(200).json({products: allProductsDTO});
    }
};

export const getProductById = async (req, res) =>{
    const {id} = req.params;
    const product = await productsDAO.getById(id);
    if(product){
        res.status(200).json({product: productsDTO(product)}); //TODO: Si no se devuelve un producto y se devuelve, por ejemplo, el mensaje, fallaría. APLICAR ERRORES SEGÚN CLASE 21. Try Catch.
    }
}

export const createProduct = async (req, res) =>{
    //1. Crear nuevo producto.
    const {name, description, price, stock, imageURL} = await req.body; //!!!
    const newProduct = await {
        timestamp: new Date().getTime(),
        name: name,
        description: description, 
        price: price,
        stock: stock, 
        imageURL: imageURL
    };
    const newProductAddedMSG = await productsDAO.save(newProduct);
    res.json(newProductAddedMSG);
}

export const updateProduct = async (req, res) =>{
    const {id} = req.params;
    const newData = req.body;
    const updatedProduct = productsDAO.updateById(id, newData);
    updatedProduct.then((data) => res.send(data));
}

export const deleteProductByID = (req, res) =>{
    const {id} = req.params;
    const deletedProduct = productsDAO.deleteById(id);
    deletedProduct.then(data => res.send(data));
}