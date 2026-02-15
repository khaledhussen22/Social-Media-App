import { Post } from "../../models/post.model.js";
import { User } from "../../models/user.model.js";
import cloudinary from "../../utils/file upload/cloudinary.config.js";


export const createpost=async(req,res,next)=>{
//upload to cloud
let attachment=[];
for (const file of req.files) {
  const{secure_url,public_id}=await cloudinary.uploader.upload(
        file.path,
        {folder:`social-app/users/${req.userExist._id}/posts`}
    );
    attachment.push({secure_url,public_id})
}
//create post??{content>>req.body,attachment:[secure_url,public_id]}
const createdPost =await Post.create({
    content:req.body.content,
    attachment,
    publisher:req.userExist._id,})

    return res.status(201).json({success:true,data:createdPost})
}

export const likeorun=async(req,res,next)=>{
    const {id}=req.params;
    //check existance of the post
    const post= await Post.findById(id)//{}//null
    if(!post) return next(new(Error("post not found",{cause:404})))
        //check user like or unlike 
       //post>>like>>array
       //includes>>true or false
       //indexof >>index  user or -1
       //like >>push in array
       //unlike>>splice userid>>array>>index of the user
       //get index >>loop
       //splice index>>loop
  const userIndex=post.likes.indexOf(req.userExist._id)//-1 or 0<
  if(userIndex==-1) {
    post.likes.push(req.userExist._id);
  }
  else{
    post.likes.splice(userIndex,1)
  }

  const updatedPost=await post.save();
  return res.status(200).json({success:true,data:updatedPost})


}
export const getPosts=async(req,res,next)=>{
  
    const posts=await Post.find().populate([
        {path:"publisher",select:"userName profilePic.secure_url"},
        {path:"likes",select:"userName profilePic.secure_url"},
        {path:"comments"},

    ])

    return res.status(200).json({success:true,data:posts})
}

export const getspecific=async(req,res,next)=>{
  //get data from req
   const {id}=req.params;

    const post=await Post.findOne({_id:id,isDeleted:false}).populate([
        {path:"publisher",select:"userName profilePic.secure_url"},
        {path:"likes",select:"userName profilePic.secure_url"},
        {path:"comments",match:{parentComment:{ $exists:false }}},

    ])

    return post?res.status(200).json({success:true,data:post}):next (new Error("post not found"),{cause:404})
}
export const hardDeletPost=async(req,res,next)=>{
    const{id}=req.params;
   const post=await Post.findOneAndDelete({
    _id:id,
    publisher:req.userExist._id
    }).populate([{path:"comments",match:{parentComment:{$exists:false}},select:"_id attachment"}]);
    if(!post) return next(new Error("post not found"),{cause:404})
    //delete from cloud
    for (const file of post.attachment) {
       await cloudinary.uploader.destroy(file.public_id);
    }

    for (const comment of post.comments) {
        if(comment.attachment.public_id)
             await cloudinary.uploader.destroy(comment.attachment.public_id)
       await comment.deleteOne();
    }
    

    return res.status(200).json({success:true,messages:"post deleted successfully"})


}
export const archievePost=async(req,res,next)=>{
    const{id}=req.params;

    const post=await Post.findOneAndUpdate({
        _id:id,
        publisher:req.userExist._id,
        isDeleted:false
    },
        {isDeleted:true}
    );
    console.log(post);
    
    if(!post)return next(new Error("post not found"),{cause:404})

        return res.status(200).json({success:true,message:"archived successfully"})

}

export const restorePost=async(req,res,next)=>{
    const{id}=req.params;

    const post=await Post.findOneAndUpdate({
        _id:id,
        publisher:req.userExist._id,
        isDeleted:true
    },
        {isDeleted:false}
    );
    
    if(!post)return next(new Error("post not found"),{cause:404})

        return res.status(200).json({success:true,message:"restored successfully"})

}
export const getPostss=async(req,res,next)=>{
    let {size,page}=req.query;
    if(!size||size<0) size=3;
    if(!page||page<0) page=1;
    const skip=size* (page-1)
    const posts=await Post.find().limit(size).skip(skip)
    const totalPosts=await Post.find().countDocuments()
    const totalPages=Math.ceil(totalPosts/size);
    const currentPage=page
    if(!posts)return next(new Error("post not found"),{cause:404})
return res.json({sucess:true,result:{data:posts,totalPages,totalPosts,currentPage}})

}

