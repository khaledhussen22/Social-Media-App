import { Router } from "express";
import { isauth } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import * as postService from "./post.service.js";
import { roles } from "../../models/user.model.js";
import { cloudUpload, fileValidation } from "../../utils/file upload/multer cloud.js";
import { isValid } from "../../middleware/validation.middelware.js";
import { archievePost, createPost, getPostss, getspecific, hardDeletPost, likeorun, restorePost } from "./post.Schema.js";
import { asyncHandler } from "../../utils/index.js";
import commentRouter from "../comments/comment.controller.js"

const router=Router();

router.use("/:postId/comment",commentRouter)

router.post(
    "/",
    isauth,
    isAuthorized(roles.USER),
    cloudUpload(fileValidation.images).array("attachment",5),
    isValid(createPost),
    asyncHandler(postService.createpost)
); //.array in one filed only
//like and unlike 
router.patch(
    "/like-unlike/:id",
    isauth,
    isAuthorized(roles.USER),
    isValid(likeorun),
    asyncHandler(postService.likeorun)
);
//get posts
// router.get(
//     "/",
//     isauth,
//     isAuthorized(roles.USER),
//     asyncHandler(postService.getPosts)
// )
//get specific post >>id
router.get(
    "/:id",
    isauth,
    isAuthorized(roles.USER),
    isValid(getspecific),
    asyncHandler(postService.getspecific)
)
// /post/id

router.delete(
    "/:id",
    isauth,
    isAuthorized(roles.USER),
    isValid(hardDeletPost),
    asyncHandler(postService.hardDeletPost)
)
/**
 * @PATHC
 * @URL /post/archieve/id
 */
router.patch(
    "/archieve/:id",
    isauth,
    isAuthorized(roles.USER),
    isValid(archievePost),
asyncHandler(postService.archievePost)
)
router.patch(
    "/restore/:id",
    isauth,
    isAuthorized(roles.USER),
    isValid(restorePost),
asyncHandler(postService.restorePost)
)
//pagination
router.get(
    "/",
    isValid(getPostss),
   asyncHandler(postService.getPostss),
)



export default router;

