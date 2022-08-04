import {fork} from 'child_process';
import path from 'path';

export const getRandomNumbersWithFork = (req, res) =>{
    const cant = req.query.cant;
    const computo = fork(
        path.resolve() + '/src/utils/calculateRandomNumbers.js',
        {env: Object.assign(process.env, {CANT: cant})} //Recibo cant por query y lo envío al child process por una variable de entorno.
    );
    computo.send("Child Process Started!");
    computo.on("message", (resultado)=>{
        res.status(200).json({resultado});
    });
};