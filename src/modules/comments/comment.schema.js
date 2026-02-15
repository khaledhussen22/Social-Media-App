import joi from "joi";
import { generalFields, isValidId } from "../../middleware/validation.middelware.js";

 //params =postid
 //body=text
 //req.file=attachment
export const crcomm=joi.object({
 id:generalFields.id,
 postId:generalFields.id.required(),
 text:joi.string(),
 attachment:generalFields.attachment,
}).or("attachment","text").required()

export const getcomment=joi.object({
    id:generalFields.id,
    postId:generalFields.id.required(),
   }).required()

   export const deleteComm=joi.object({
    id:generalFields.id.required(),
    postId:generalFields.id.required(),
   }).required()
   