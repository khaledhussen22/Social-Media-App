export const isAuthorized=(context,roles)=>{
    
    
    if(!roles.includes(context.userExist.role))
        throw new Error("un authorized",{cause:400})
    
 };
    
    