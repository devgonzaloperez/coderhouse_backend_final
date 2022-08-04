import express from 'express';
import { failLogin, failSignup, getLogin, getSignup, logout, postLogin, postSignup } from '../controllers/auth.controller.js';
import {checkAuth} from '../middlewares/auth.middleware.js';
import passport from '../utils/passport.util.js';

const router = express.Router();

//1. Rutas de REGISTRO de usuarios.

    //Ruta GET. Devuelve el formulario de registro de Handlebars.
    router.get("/signup", getSignup);

    //Ruta POST. Recibe la información del formulario de registro de handlebars.
    router.post("/signup", 
        passport.authenticate("signup", {failureRedirect: "/failsignup"}), //Middleware de ruta hecho con "passport". El primer parámetro es el nombre de la estrategia (ver en passport.util.js) y el segundo parámetro es la redirección en caso de error.
        postSignup
    ); 

    //Ruta GET. Devuelve la vista para el caso de failSignup.
    router.get("/failsignup", failSignup);

//2. Rutas de LOGIN de usuarios.

    //Ruta GET. Devuelve el formulario de login de Handlebars.
    router.get("/login", getLogin);

    //Ruta POST. Recibe la información del formulario de login de handlebars.
    router.post("/login",
        passport.authenticate("login", {failureRedirect: "/failLogin"}), //Middleware de ruta hecho con "passport".
        postLogin
    );

    //Ruta GET. Devuelve la vista para el caso de failLogin.
    router.get("/failLogin", failLogin);

//3. Ruta de LOGOUT de usuarios.

    //Ruta GET.
    router.get("/logout", logout);

//4. Ruta para verificar la AUTENTICACIÓN de usuarios.

    //Ruta GET.
    router.get("/protected", 
        checkAuth, //Middleware.
        (req, res)=>{
            console.log("Está autenticado");
            res.send("<h1>Está autenticado.</h1>")
        }
    );

export default router;