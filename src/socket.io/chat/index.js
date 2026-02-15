import { Chat } from "../../models/chat.model.js";

    export const sendMessage=(socket, io)=>{
        return async(data)=>{
        const{message,destId}=data;
      
            
        //emit even to destId
    socket.to(destId).emit("receiveMessage",{message})
    socket.emit("successMessage",{message});
    //db
      const chat= await Chat.findOne({
        users:{$all:[destId,socket.id]},
      });
      if(chat) {
        await Chat.updateOne(
            {users:{$all:[destId,socket.id]}},
            {
                $push:{messages:{sender:socket.id,message}}
            }
        );
      }else{
        await Chat.create({
            users:[destId,socket.id],
            message:[{sender:socket.id,message}]
        })
      }
    }
    }