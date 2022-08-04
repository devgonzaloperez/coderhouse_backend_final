import dotenv from 'dotenv';
import Yargs from 'yargs';
import mongoose from "mongoose";

dotenv.config();
const yargs = Yargs(process.argv.slice(2)).argv;
const enviroment =  yargs.enviroment || "";

export let mongoURI;
export let mongoSecret;
let msg;

switch (enviroment){
  case "DEV":
    mongoURI = process.env.MONGO_URI_DEV;
    mongoSecret = process.env.SECRET_MONGO_CONNECT_DEV;
    msg = "DEV";
    break;
  case "PROD":
    mongoURI = process.env.MONGO_URI_PROD;
    mongoSecret = process.env.SECRET_MONGO_CONNECT_PROD;
    msg = "PROD";
    break;
  default:
    mongoURI = process.env.MONGO_URI_DEV;
    mongoSecret = process.env.SECRET_MONGO_CONNECT_PROD;
    msg = "DEV";
};

mongoose.connect(mongoURI, (error)=>{
    if(error){
        console.log("Se ha producido un error al conectarse a la BBDD MongoDB.")
    }
    else{
        console.log(`¡Se ha conectado a la BBDD MongoDB! Enviroment: ${msg}.`)
    }
});