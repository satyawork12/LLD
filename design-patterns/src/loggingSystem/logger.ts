import type { LogWriter } from "./logWriter.js";

const logPriority = {
    "Error": 1,
    "Warn": 2,
    "Info": 3,
    "Debug": 4,

}
enum level {
    error = "ERROR",
    warn = "WARN",
    debug = "DEBUG",
    info = "INFO"
}

export class Logger {
    constructor(private severity : number ,
        private logWriter : LogWriter
    ){}
    error(message : string){
        const timeStamp = new Date();
        this.logWriter.write(`[ ${timeStamp} ] [Error] ${message}`)
    }
    warn(message : string){
        if(this.severity>=logPriority.Warn){
            const timeStamp = new Date();
        this.logWriter.write(`[ ${timeStamp} ] [WARN] ${message}`)
        }
    }
    debug(message : string){
        if(this.severity>=logPriority.Debug){
            const timeStamp = new Date();
        this.logWriter.write(`[ ${timeStamp} ] [DEBUG] ${message}`)
        }
    }
    info(message : string){
        if(this.severity>=logPriority.Info){
            const timeStamp = new Date();
        this.logWriter.write(`[ ${timeStamp} ] [INFO] ${message}`)
        }
    }


}