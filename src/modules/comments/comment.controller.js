import { Router } from "express";
import { isauth } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { roles } from "../../models/user.model.js";
import { cloudUpload, fileValidation } from "../../utils/file upload/multer cloud.js";
import { isValid } from "../../middleware/validation.middelware.js";
import { crcomm, deleteComm, getcomment } from "./comment.schema.js";
import { asyncHandler } from "../../utils/index.js";
import * as commentService from "./comment.service.js"

const router= Router({mergeParams:true});
// POST>> /post/postId/comment //create or reply
//لو حطينا كومنتت اي دي بيبقي ريبلاي مش كومنت
router.post(
    "/:id?",
    isauth,
    isAuthorized(roles.USER),
    cloudUpload(fileValidation.images).single("attachment"),
    isValid(crcomm),
    asyncHandler(commentService.createComment)
);
//get comments and replies
/**
 * @params postid & id -> comment optional 
 */
router.get(
    "/:id?",
    isauth,
    isAuthorized(roles.USER),
    isValid(getcomment),
    asyncHandler(commentService.getComment))

    /**
 * @url post/postId/comment/id
 */

router.delete(

    "/:id",
    isauth,
    isAuthorized(roles.USER),
    isValid(deleteComm),
    asyncHandler(commentService.deleteComm)
)

export default router;
