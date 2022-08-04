import passport from 'passport'; //Passport.
import { Strategy } from 'passport-local'; //Estrategia de Passport.
import bcrypt from 'bcrypt';
import { sendEmailToAdmin } from './nodemailer.js';
import { UserModel } from '../models/user.model.js';

//1. Estrategia para REGISTRAR un usuario.
passport.use("signup", new Strategy({
    passReqToCallback: true //Sirve para que se ejecute el callback que aparece a continuación.
}, async (req, userName, password, done)=>{
    try {
        
        //1. Verificar si el usuario recibido existe.
        const userExists = await UserModel.findOne({userName});
            //1A) Si el usuario existe. En este caso, no se cumple la estrategia ya que la misma es para REGISTRAR un usuario y, si el mismo ya está registrado, no estaríamos cumpliendo con lo que requiere el proceso (un usuario aún no registrado).
            if(userExists){
                console.log("El usuario existe.")
                return done(null, false)
            }
            //1B) Si el usuario no existe, crearlo. En este caso, se cumple la estrategia.
            const newUser = {
                userName,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                avatarURL: req.body.avatarURL,
                email: req.body.email,
                phone: req.body.phone,
                isAdmin: false
            };
            const user = await UserModel.create(newUser);
        
        //2. Enviar un E-mail al administrador avisándole que se registró un nuevo usuario.
        sendEmailToAdmin(newUser);

        return done(null, user);
    }
    catch (error){
        console.log(error);    
    }
})); //Los parámetros de passport.use son el nombre de la estrategia y su configuración.

//2. Estrategia para el LOGIN de usuarios.
passport.use("login", new Strategy(async (userName, password, done)=>{
    try {
        //1. Verificar si el usuario recibido existe.
        const user = await UserModel.findOne({userName});
            //1A. Si el usuario no existe, no se cumple la estrategia.
            if(!user){
                console.log("Usuario no encontrado.");
                done(null, false); //Devolución cuando no se cumple la estrategia.
            }
            //1B. Si el usuario existe, se cumple la estrategia.
                //1BA. Verificar si la contraseña recibida (password) es la misma que la del usuario en la BBDD MongoDB (user.password).
                const isValid = bcrypt.compareSync(password, user.password); //Nos devuelve true o false.
                if(isValid){
                    return done(null, user);
                }
                else{
                    done(null, false);
                }
    } 
    catch(error){
        console.log(error);
        done(error);
    }
}));

//Passport solicita que hay que serializar y deserializar la información. Por ello hay que agregar las funciones que se observan a continuación.
passport.serializeUser((user, done)=>{
    done(null, user._id)
});

passport.deserializeUser((id, done)=>{
    UserModel.findById(id, done)
});

export default passport;
