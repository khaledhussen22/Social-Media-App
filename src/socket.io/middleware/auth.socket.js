
import jwt from "jsonwebtoken"
import { User } from "../../models/user.model.js";
import { verifyToken } from "../../utils/index.js";


export const authSocket=async(socket,next)=>{
try {
    const {authorization}=socket.handshake.auth;
if(!authorization)
 return next (new Error("token required"))
if(!authorization.startsWith("hambozo"))
    return next (new Error("invalid berror token"))

  const token = authorization.split(" ")[1];
    if (!token) {
        return next (new Error("jwt token required"))

      }
      
    const result=verifyToken({token});
    if(result.error) return next(result.error)
    // console.log(id)
    //return payload or throw error
  //check user existance
  const userExist= await User.findById(result.id);
  if(!userExist){
    return next (new Error("user not found"))

  }


  if(userExist.isDeleted==true) return next(new Error("login first",{cause:400}));

  // if(userExist.deletedAt.getTime()>iat*1000) return next(new Error("invalid token",{cause:400})) 
  if (userExist.isDeleted && userExist.deletedAt && userExist.deletedAt.getTime() > result.iat * 1000) {
    return next(new Error("Invalid token", { cause: 400 }));
  }
  


//pass data of user to req
socket.userExist=userExist;
socket.id=userExist.id


return next();



} catch (error) {
    return next (error)

}
}