import joi from "joi";
import { model, Schema, Types } from "mongoose";
import cloudinary from "../utils/file upload/cloudinary.config.js";

const commentSchema=new Schema({
  post:{type:Types.ObjectId,ref:"Post",required:true},
  user:{type:Types.ObjectId,ref:"User",required:true},
  text:{type:String,required:function(){
    return this.attachment?false:true;
  
  }},
  attachment:{secure_url:String,public_id:String},
  likes:[{type:Types.ObjectId,ref:"User"}],
  parentComment:{type:Types.ObjectId,ref:"Comment"},
  updatedBy:{type:Types.ObjectId,ref:"User"},

},
{timestamps:true}
);

//middleware>>4types>> doc,model.query,aggregation
// deleteOne>>doc & query 
commentSchema.post("deleteOne",{query:false,document:true},
  async function(doc,next){
    //check replies related to comment
    const replies=await this.constructor.find({parentComment:doc._id})//[{}{}{}],[]
    if(replies.length){
      for (const reply of replies) {
        if(reply.attachment.public_id)
          cloudinary.uploader.destroy(reply.attachment.public_id)//delete from cloud

        await reply.deleteOne();//from database
      }
    }
return next(); //base case
})


export const Comment=model("Comment",commentSchema)












