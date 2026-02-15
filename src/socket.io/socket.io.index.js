import { Server } from "socket.io";
import {  sendMessage } from "./chat/index.js";
import { authSocket } from "./middleware/auth.socket.js";


export const initSocket=(server)=>{
    const io=new Server(server,{
        cors:{origin:"*"},
    });

io.use(authSocket);
io.on("connection",(socket)=>{
    console.log(socket.id);
    socket.on("sendMessage",sendMessage(socket, io))
    })
}
