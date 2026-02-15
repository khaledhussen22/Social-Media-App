import { Router } from "express";
import { isauth } from "../../middleware/authentication.middleware.js";

import * as chatServices from "./chat.service.js"
import { asyncHandler } from "../../utils/index.js";

const router=Router()

// send message
router.post("/sendMessage",isauth,asyncHandler(chatServices.sendMessage))

router.get("/:FID",isauth,asyncHandler(chatServices.getAll))
export default router;