import cors from "cors";
import connectDB from "./db/connection.js";
import authRouter from "./modules/auth/auth.controller.js"
import userRouter from "./modules/user/user.controller.js"
import chatRouter from "./modules/chat/chat.controller.js"

import commentRouter from "./modules/comments/comment.controller.js"
import { globalError } from "./utils/errors/global.error.js";
import { notFound } from "./utils/errors/not-found.js";
import postRouter from "./modules/post/post.controller.js"
import adminRouter from "./modules/admin/admin.controller.js"
import {rateLimit} from "express-rate-limit"
import { createHandler } from "graphql-http/lib/use/express";
import { schema } from "./app.schema.js";
const bootstrap=async (app,express)=>{
    // app.use(rateLimit({
    //     windowMs:3*60*1000,
    //     limit:5,
    //     message:"dont try to hack",
    //     statusCode:400,
    //     handler:(req,res,next,options)=>{
    //     return next (new Error(options.message,{cause:options.statusCode}))
    //     },
    //     legacyHeaders:true//it appears the xratelimit tries(how many)

    // }));
    //parse req from raw body only (raw json)
    app.use(express.json());
    app.use(cors("*"))
    //gql
    app.all("/graphql",createHandler({
        schema,
        context:(req)=>{
        const{authorization}=req.headers;
        return {authorization};
         },
         formatError:(error)=>{
            return {
                success:false,
                statusCode:error.originalError?.cause || 500,
                message:error.originalError?.message
            }
         }
        
}))
    await connectDB()
    //bulitin middleware that handles the static files
    app.use("/uploads",express.static("uploads"))

app.use("/auth",authRouter)
app.use("/user",userRouter)
app.use("/post",postRouter)
app.use("/comment",commentRouter)
app.use("/admin",adminRouter)
app.use("/chat",chatRouter)








 
    app.all("*",notFound)
    app.use(globalError)

}
export default bootstrap;
