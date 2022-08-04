import mongoose from "mongoose";

//1. Definir el schema de cada producto.
const ProductSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    }
});

//2. Crear el modelo.
export const ProductsModel = mongoose.model("products", ProductSchema);