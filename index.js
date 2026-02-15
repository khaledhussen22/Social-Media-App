import express from "express";
import bootstrap from "./src/app.controller.js";
import dotenv from "dotenv";
import morgan from "morgan"
import chalk from "chalk"
import { initSocket } from "./src/socket.io/socket.io.index.js";

dotenv.config();
const app=express()
// app.use(morgan("combined"))

bootstrap(app,express);

const port=process.env.PORT ||3000;
const server=app.listen(port,()=>{
    console.log(chalk.blue("app is running on port "),port);
    
});
// sendemail();
initSocket(server)