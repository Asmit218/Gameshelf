import express from "express";
import { matchHistory } from "../controllers/profilecontroller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/history/:userId",protectRoute,matchHistory);

export default router;