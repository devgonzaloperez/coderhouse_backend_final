import axios from 'axios';

//Tests con Axios. Llamar a las funciones.

//a) GET All Products (Get).
const getProducts = async () =>{
    const response = await axios.get('http://localhost:8080/api/productos');
    console.log(response.data);
};

//b) GET Product (Get).
const getProductByID = async () =>{
    const response = await axios.get('http://localhost:8080/api/productos/62b628a39fba4368db36f12e');
    console.log(response.data);
};

//c) POST Product (Create).
const createProduct = async () =>{
    const response = await axios.post(
        'http://localhost:8080/api/productos', 
        {
            name: "Test Name",
            description: "Test Description",
            price: 100,
            stock: 100,
            imageURL: "Test URL"
        }
    );
    console.log(response.data);
};

//d) PUT Product (Update).
const updateProductByID = async () =>{
    const response = await axios.put(
        'http://localhost:8080/api/productos/62b628b29fba4368db36f131', 
        {stock: 100}
    );
    console.log(response.data);
};

//e) DELETE Product (Delete).
const deleteProductByID = async () =>{
    const response = await axios.delete('http://localhost:8080/api/productos/62bc7cb65d2e8e946c23f15c');
    console.log(response.data);
};


