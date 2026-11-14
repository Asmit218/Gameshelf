import express from "express";
import { updateProfile } from "../controllers/update.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import upload from "../utils/multer.js";

const settingRouter = express.Router();

settingRouter.put("/update", protectRoute, upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "bgPhoto", maxCount: 1 },
]), updateProfile);

export default settingRouter;