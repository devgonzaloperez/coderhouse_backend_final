import express from "express";
import { createProduct, deleteProductByID, getAllProducts, getProductById, updateProduct } from "../controllers/products.controllers.js";

const router = express.Router();

router.get('/', getAllProducts); 
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProductByID);

export default router;