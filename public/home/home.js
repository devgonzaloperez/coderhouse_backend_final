const socket = io('http://localhost:8080');

/*--------------------LISTA DE PRODUCTOS EN TIEMPO REAL (SOCKET.IO)--------------------*/

const productsForm = document.querySelector("#products-form");
const name = document.querySelector("#name");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const stock = document.querySelector("#stock");
const imageURL = document.querySelector("#imageURL");
const productos = document.querySelector("#productos");

productsForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const producto = {
        timestamp: new Date().getTime(),
        name: name.value,
        description: description.value,
        price: price.value,
        stock: stock.value,
        imageURL: imageURL.value
    };
    socket.emit("nuevoProductoDesdeFrontend", producto); //El socket guarda el producto en la BBDD.
    name.value = "";
    description.value = "";
    price.value = "";
    stock.value = "";
    imageURL.value = "";
})

socket.on('productosDesdeBackend', (data) =>{
    const html = data.map(product =>{
        return (
            `<tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td>${product.imageURL}</td>
            </tr>`
        )
    }).join("");
    productos.innerHTML = html;
})

/*--------------------CENTRO DE MENSAJES (CHAT) EN TIEMPO REAL (SOCKET.IO)--------------------*/

const chatForm = document.querySelector("#chat-form");
const nombre = document.querySelector("#nombre");
const texto = document.querySelector("#texto");
const mensajes = document.querySelector("#mensajes");

chatForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const mensaje = {
        fecha: moment().format('DD/MM/YYYY - hh:mm:ss a'),
        nombre: nombre.value,
        texto: texto.value
    };
    socket.emit("nuevoMensajeDesdeFrontend", mensaje);
    texto.value = "";
})

socket.on('mensajesDesdeBackend', (data) =>{
    const html = data.map(mensaje =>{
        return (
            `<div class="mensaje">
                <span>[${mensaje.fecha}]</span>
                <strong>${mensaje.nombre}:</strong>
                <p>${mensaje.texto}</p>                            
            </div>`
          )
    }).join("");
    mensajes.innerHTML = html
})