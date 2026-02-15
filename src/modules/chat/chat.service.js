import { Chat } from "../../models/chat.model.js";


export const sendMessage=async(req,res,next)=>{
    const {message,FID}=req.body;
  const chat= await Chat.findOne({
    users:{$all:[FID,req.userExist._id]},
  });
  if(chat) {
    await Chat.updateOne(
        {users:{$all:[FID,req.userExist._id]}},
        {
            $push:{messages:{sender:req.userExist._id,message}}
        }
    );
  }else{
    await Chat.create({
        users:[FID,req.userExist._id],
        message:[{sender:req.userExist._id,message}]
    })
  }
  return res.status(200).json({success:true,message:"send succesfully"})

};
 export const getAll=async(req,res,next)=>{ 
    const{FID}= req.params;
    const chat=await Chat.findOne({
        users:{$all:[FID,req.userExist._id]},
    }).populate([
        {path:"users"},
        {path:"messages.sender",select:"userName"},
    ])
    return res.status(200).json({success:true,data:{chat}})
 }