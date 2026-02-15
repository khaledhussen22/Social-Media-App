import { isAuth } from "../../../graphql/authentication.js";
import { isAuthorized } from "../../../graphql/authorization.js";
import { isValid } from "../../../graphql/validation.js";
import { Post } from "../../../models/post.model.js";
import { getspecific } from "../post.Schema.js";

export const getPosts=async (parent,args,context)=>{
       await  isAuth (context);
       isAuthorized(context,["USER "])
       isValid(getspecific,args)
        const posts=await  Post.find();
        return {
            success:true,
            statusCode:200,
            data:posts,
        };
    }
    export const getPost=async (parent,args,context)=>{
        await  isAuth (context);
        isAuthorized(context,["USER "])
        isValid(getspecific,args)
        
        const post=await  Post.findById(args.id);
        return {
            success:true,
            statusCode:200,
            data:post,
            
        };
    }