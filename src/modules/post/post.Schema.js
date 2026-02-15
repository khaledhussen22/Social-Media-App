import joi from "joi";
import { generalFields, isValidId } from "../../middleware/validation.middelware.js";
export const createPost= joi.object({
    content: joi.string().when("attachment", {
        is: joi.exist(),
        then: joi.optional(),
        otherwise: joi.required(),
      }),
    attachment:joi.array().items(generalFields.attachment),
})
.or("content","attachment")
.required()

export const likeorun=joi.object({
    id:generalFields.id.required(),
}).required();


export const getspecific=joi.object({
    id:generalFields.id.required(),
}).required();

export const hardDeletPost=joi.object({
    id:generalFields.id.required(),
}).required();

export const archievePost=joi.object({
    id:generalFields.id.required(),
}).required();
export const restorePost=joi.object({
    id:generalFields.id.required(),
}).required();

export const getPostss=joi.object({
    page:joi.number().min(1),
    size:joi.number().min(1)
}).required()

