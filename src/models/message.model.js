import { ObjectId } from "bson";
import { model, Schema, Types } from "mongoose";
 
const messageSchema=new Schema (
{
    content:{type:String,reuired:true},
    sender:{type:Types.ObjectId,ref:"User"},
    reciever:{type:Types.ObjectId,required:true,ref:"User"},
},
{timestamps:true}

)

export const Message=model("message",messageSchema)


