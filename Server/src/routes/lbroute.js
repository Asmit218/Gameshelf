import { getLeaderboard } from "../controllers/lbcontroller.js";
import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";

const lbRouter = express.Router()

lbRouter.get("/",protectRoute,getLeaderboard);

export default lbRouter;