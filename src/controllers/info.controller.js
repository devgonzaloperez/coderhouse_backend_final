import Yargs from 'yargs';
import os from 'os';

export const getProjectInfo = (req, res) =>{

    const info = {
        args: JSON.stringify(Yargs(process.argv.slice(2)).argv),
        operatingSystem: process.platform,
        nodeVersion: process.version,
        memoryUsage: process.memoryUsage(),
        processID: process.pid,
        currentDirectory: process.cwd(),
        numbersOfCpus: os.cpus().length
    };

    res.render("info", info);
};