import express from "express";
import { gameCount, gameWinCount, matchHistory, totalWinLoss } from "../controllers/profilecontroller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const profileRouter = express.Router();

profileRouter.get("/history/:userId",protectRoute,matchHistory);
profileRouter.get("/gamewin/:userId",protectRoute,gameWinCount);
profileRouter.get("/gamecount/:userId",protectRoute,gameCount);
profileRouter.get("/totalwinloss/:userId",protectRoute,totalWinLoss);

export default profileRouter;