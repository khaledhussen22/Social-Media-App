// import { Comment } from "../../models/comment.model.js";
import { Comment } from "../../models/comment.model.js";
import { Post } from "../../models/post.model.js";
import cloudinary from "../../utils/file upload/cloudinary.config.js";

export const createComment=async (req,res,next)=>{
    const {postId,id}=req.params;
    const{text}=req.body;
    const post=await Post.findById(postId) ;
     if(!post) return next(new Error("post not found",{casue:404}));
     //upload attachment to the cloud
     if(req.file){
       var {secure_url,public_id}=await cloudinary.uploader.upload(
        req.file.path,
        {folder:`social-app/users/${post.publisher}/posts/comments`}
    );
     }
     const comment=await Comment.create({
        post:postId,
        user:req.userExist._id,
        text, 
        attachment:{secure_url,public_id},
        parentComment:id,
     })
     res.status(201).json({success:true,data:comment})

}

//const is local scope and var is global scope
//var is functional scope 

export const getComment=async(req,res,next)=>{
    //get data from request
    const {postId,id}=req.params;
  const comments=await Comment.find({post:postId,parentComment:id,})
  .populate([
  {  path:"user",select:"userName profilePic"},
  

]) 
  return res.status(200).json({success:true,data:comments})
}
export const deleteComm=async(req,res,next)=>{
 
    const {id,postId}=req.params;
   //check comment existance
   const comment =await Comment.findById(id)
   .populate([{path:"post",select:"publisher"}]);

   if(![comment.user.toString(),comment.post.publisher.toString()].includes(req.userExist.id)) 
    return next(new Error("not authorised",{cause:401}))


//delete attachment related to the comment if exist
if(comment.attachment.public_id)
await cloudinary.uploader.destroy(comment.attachment.public_id)
//delete the comment from the database
await comment.deleteOne()
return res.status(200).json({success:true,message:"comment deleted successfully"})
}