import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI, (error)=>{
    if(error){
        console.log("Se ha producido un error al conectarse a la BBDD MongoDB.")
    }
    else{
        console.log("¡Se ha conectado a la BBDD MongoDB!")
    }
});