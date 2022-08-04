import { CartsDAOFactory } from '../services/DAOs/CartsDAOFactory.js';

const cartsDAO = CartsDAOFactory.getDao();

export const createCart = async (req, res) =>{
    const newCart = await {
        timestamp: new Date().getTime(),
        products: []
    }
    const msg = await cartsDAO.saveCart(newCart);
    res.json(msg);
};

export const deleteCartByID = async (req, res) =>{
    const {id} = req.params;
    const msg = await cartsDAO.deleteCartById(id);
    res.json(msg);
};

export const getAllCartProductsByID = async (req, res) =>{
    const {id} = req.params;
    const msg = await cartsDAO.getAllCartProductsByID(id);
    res.json(msg);
};

export const addProductByIDtoCartByID = async (req, res) =>{
    const {id, id_prod} = req.params;
    const msg = await cartsDAO.addProductByIDtoCartByID(id, id_prod);
    res.json(msg);
}

export const deleteProductByIDFromCartByID = async (req, res) =>{
    const {id, id_prod} = req.params;
    const msg = await cartsDAO.deleteProductByIDFromCartByID(id, id_prod);
    res.json(msg);
}
