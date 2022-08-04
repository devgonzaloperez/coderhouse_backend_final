import express from "express";
import { addProductByIDtoCartByID, createCart, deleteCartByID, deleteProductByIDFromCartByID, getAllCartProductsByID } from "../controllers/carts.controller.js";

const router = express.Router();

router.post('/', createCart);
router.delete('/:id', deleteCartByID);
router.get('/:id/productos', getAllCartProductsByID);
router.post('/:id/productos/:id_prod', addProductByIDtoCartByID);
router.delete('/:id/productos/:id_prod', deleteProductByIDFromCartByID);

export default router;