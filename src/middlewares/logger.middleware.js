import { logger } from "../logger/logger.js";

export const loggerRoute = (req, res, next) =>{
    if(req.originalUrl !== "/favicon.ico"){
        logger.info(`Se ha recibido una petición en la ruta ${req.originalUrl}.`);
    }
    next();
};

export const loggerNoRoute = (req, res, next) =>{
    if(req.originalUrl !== "/favicon.ico"){
        logger.warn(`Se ha recibido una petición en la ruta inexistente ${req.originalUrl}.`);
    }
    next();
};

