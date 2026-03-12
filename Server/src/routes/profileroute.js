import express from "express";
import { gameCount, gameWinCount, levelxp, matchHistory, totalWinLoss } from "../controllers/profilecontroller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const profileRouter = express.Router();

profileRouter.get("/history/:userId",protectRoute,matchHistory);
profileRouter.get("/gamewin/:userId",protectRoute,gameWinCount);
profileRouter.get("/gamecount/:userId",protectRoute,gameCount);
profileRouter.get("/totalwinloss/:userId",protectRoute,totalWinLoss);
profileRouter.get("/levelxp/:userId",protectRoute,levelxp);

export default profileRouter;