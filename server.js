/*----------------------------------IMPORTS EXTERNOS:----------------------------------*/

import { createServer } from 'http';
import { readFileSync, writeFileSync } from 'fs'; 
import express, { json, urlencoded } from 'express'; 
import cors from 'cors'; 
import { Server } from 'socket.io'; 
import dotenv from 'dotenv';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import Yargs from 'yargs';
import cluster from 'cluster';
import os from 'os';
import compression from 'compression';

/*----------------------------------IMPORTS INTERNOS:----------------------------------*/

import { noRoute } from './src/controllers/noRoute.controller.js';
import { getFakerProducts } from './src/controllers/getFakerProducts.controller.js';
import authRouter from './src/routers/auth.router.js';
import productsRouter from './src/routers/products.router.js';
import cartsRouter from './src/routers/carts.router.js';
import passport from './src/utils/passport.util.js';
import { getProjectInfo } from './src/controllers/info.controller.js';
import { getRandomNumbersWithFork } from './src/controllers/getRandomNumbersWithFork.controller.js';
import { logger } from './src/logger/logger.js';
import { loggerNoRoute, loggerRoute } from './src/middlewares/logger.middleware.js';
import { sendWhatsAppToAdmin } from './src/utils/twilio.js';
import { ProductsDAOFactory } from './src/services/DAOs/ProductsDAOFactory.js';
import { mongoURI, mongoSecret } from './src/configs/config.js';

const yargs = Yargs(process.argv.slice(2)).argv;

if(cluster.isPrimary){

    /*----------------------------------LÓGICA FORK O CLUSTER:----------------------------------*/

    const numberOfCPUS = os.cpus().length;
    console.log(`La cantidad de CPUS/Procesadores es ${numberOfCPUS}.`);
    console.log(`El Process ID (PID) del PROCESO MÁSTER es ${process.pid}.`);

    if(yargs.mode === "FORK" || yargs.mode === undefined){
        console.log("Fork Mode Activated.");
        for(let i = 1; i < 2; i++){
            cluster.fork()
        };
    }

    if(yargs.mode === "CLUSTER"){
        console.log("Cluster Mode Activated.");
        for(let i = 0; i < numberOfCPUS; i++){
            cluster.fork()
        };
    }

    cluster.on("exit", (worker, code, signal)=>{
        console.log(`El proceso que murió es el del Process ID (PID) ${worker.process.pid}.`);
        cluster.fork(); //Sirve para que si se muere un proceso hijo, se levante automáticamente uno nuevo. Se puede probar matar uno intencionalmente desde el administrador de tareas.
    })

}
else{

    /*----------------------------------SERVIDOR:----------------------------------*/

    dotenv.config();
    const app = express();
    const server = createServer(app); //Socket IO NO funciona con Express. Hay que envolver Express en un servidor HTTP.
    const io = new Server(server);

    /*-----------------------------MIDDLEWARES:-----------------------------*/

    app.use(express.static('public'));
    app.use(json());
    app.use(urlencoded({extended:true}));
    app.use(cors());
    app.use(compression());

    /*----------------------------------SESSION (COOKIES):----------------------------------*/

    app.use(session({
        store: connectMongo.create({
            mongoUrl: mongoURI,
            options: {userNewUrlParser: true, useUnifiedTopology: true}
        }),
        secret: mongoSecret,
        resave: true,
        saveUninitialized: true,
        rolling: true, //Sirve para que, con cada refresh, se vuelvan a acumular 10000ms y no se borre automáticamente a los 10000ms.
        cookie: {maxAge: 600000}
    }));

    /*----------------------------------PASSPORT:----------------------------------*/

    app.use(passport.initialize());
    app.use(passport.session());

    /*----------------------------------HANDLEBARS:----------------------------------*/

    app.set("view engine", "hbs");
    app.set("views", "./src/views");

    /*----------------------------------PRODUCTS LIST SOCKET IO:----------------------------------*/

    const productsDAO = ProductsDAOFactory.getDao();

    io.on("connection", (socket)=>{

        console.log("Se ha conectado un usuario!");

        socket.on("nuevoProductoDesdeFrontend", async (data) =>{
            await productsDAO.save(data);
            sendWhatsAppToAdmin(data.name);
            const arrProducts = await productsDAO.getAll();
            io.sockets.emit("productosDesdeBackend", arrProducts);
        })

        socket.on("disconnect", ()=>{
            console.log("Se ha desconectado un usuario.")
        })

    });

    /*----------------------------------CHAT SOCKET IO:----------------------------------*/

    io.on("connection", (socket)=>{

        console.log("Se ha conectado un usuario!");

        socket.on("nuevoMensajeDesdeFrontend", async (data) =>{
            const mensajes = await JSON.parse(readFileSync('./src/db/mensajes.txt'));
            await mensajes.push(data);
            await writeFileSync('./src/db/mensajes.txt', JSON.stringify(mensajes));
            //2. Enviar TODOS los mensajes a TODOS los frontends (clientes).
            io.sockets.emit("mensajesDesdeBackend", mensajes)
        })

        socket.on("error", ()=>{
            logger.error("Socket Error.")
        })

        socket.on("disconnect", ()=>{
            console.log("Se ha desconectado un usuario.")
        })


    });

    /*-------------------------ROUTERS:-------------------------*/

    /*INDEX*/
    app.get("/", (req, res)=>{res.render('index.hbs')});

    /*ROUTER AUTH*/
    app.use("/", authRouter);

    /*ROUTER PRODUCTOS*/
    app.use('/api/productos', [loggerRoute], productsRouter);

    /*ROUTER CARRITO*/
    app.use('/api/carrito', [loggerRoute], cartsRouter);

    /*RUTA FAKER PRODUCTS*/
    app.get('/api/productos-test', [loggerRoute], getFakerProducts);

    /*RUTA INFO*/
    app.get('/info', [loggerRoute], getProjectInfo);

    /*RUTA RANDOM (CHILD PROCESS)*/
    app.get('/api/randoms', [loggerRoute], getRandomNumbersWithFork);

    /*RUTA INEXISTENTE*/
    app.use('*', [loggerNoRoute], noRoute);
                                                                                    
    /*-----------------------------------SERVER:------------------------------------*/

    const PORT = yargs.port || process.env.PORT;

    server.listen(PORT, ()=>{
        logger.info(`Server started on PORT ${PORT}!`)
    });

    server.on('error', (error)=>{logger.error(error)});

};