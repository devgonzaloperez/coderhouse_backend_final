import winston from "winston";

export const logger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [
        new winston.transports.Console({level: "info"}),
        new winston.transports.File({filename: "./src/logger/warn.log", level: "warn"}),
        new winston.transports.File({filename: "./src/logger/error.log", level: "error"}),
    ]
});

//Test (node winston.js).
//logger.log("info", "Mensaje Info.");
//logger.log("warn", "Mensaje Warn.");
//logger.log("error", "Mensaje Error.");