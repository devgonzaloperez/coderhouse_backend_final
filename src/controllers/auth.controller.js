import path from 'path';
import { ProductsDAOFactory } from '../services/DAOs/ProductsDAOFactory.js';

export const getSignup = (req, res) =>{
    res.sendFile(path.resolve() + "/src/views/signup.html");
}

export const postSignup = (req, res) =>{
    const user = req.user;
    console.log(user);
    res.sendFile(path.resolve() + "/src/views/login.html");
}

export const failSignup = (req, res) =>{
    console.log("Error en el registro.");
    res.render("signup-error", {});
}

export const getLogin = async (req, res) =>{
    //A) Si el usuario está loggeado.
    if(req.isAuthenticated()){ //Es una función de passport.
        const user = req.user; //Req.user lo recibimos gracias a session que guarda el usuario en req.user.
        const productsDAO = ProductsDAOFactory.getDao(); 
        const arrProducts = await productsDAO.getAll();
        res.render('home.hbs', {
            user: user,
            arrProducts: arrProducts
        })
    } //B) Si el usuario no está loggeado.
    else{
        console.log("Usuario no loggeado.");
        res.sendFile(path.resolve() + "/src/views/login.html");
    }
}

export const postLogin = async (req, res) =>{
    const user = req.user;
    console.log(user);
    const productsDAO = ProductsDAOFactory.getDao(); 
    const arrProducts = await productsDAO.getAll();
    res.render('home.hbs', {
        user: user,
        arrProducts: arrProducts
    });
}

export const failLogin = (req, res) =>{
    console.log("Error en el login.")
    res.render("login-error", {});
}

export const logout = async (req, res) =>{
    await req.session.destroy((err)=>{
        if(!err){
            console.log("Logout.");
            req.logout();
            res.sendFile(path.resolve() + "/src/views/login.html");
        }
        else{res.json(err)}
    })
}
