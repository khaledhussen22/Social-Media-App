import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { messages } from "../utils/messages/index.js";
import { verifyToken } from "../utils/index.js";

export const isAuth=async(context)=>{

    const {authorization}=context;
if(!authorization)
     throw new Error("token is required",{cause:400})

if(!authorization.startsWith("hambozo"))
    throw new Error("invalid berror token",{cause:400})

  const token = authorization.split(" ")[1];
    if (!token) {
        throw new Error("token is required",{cause:400})

      }
      
    const result=verifyToken({token});
    if(result.error) return next(result.error)
    // console.log(id)
    //return payload or throw error
  //check user existance
  const userExist= await User.findById(result.id).populate([{path:"friends"}]);
  if(!userExist) 
     throw new Error(" user not found ",{cause:404})



  if(userExist.isDeleted==true) throw new Error("user delted before",{cause:400})


  // if(userExist.deletedAt.getTime()>iat*1000) return next(new Error("invalid token",{cause:400})) 
  if (userExist.isDeleted && userExist.deletedAt && userExist.deletedAt.getTime() > result.iat * 1000) {
    throw new Error("invalid token",{cause:400})

  }

//pass data of user to req
context.userExist=userExist;


}