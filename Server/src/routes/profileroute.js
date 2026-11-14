import express from "express";
import { biosCount, gameCount, gameWinCount, levelxp, matchHistory, otherStats, photo, totalWinLoss } from "../controllers/profilecontroller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const profileRouter = express.Router();

profileRouter.get("/photo/:playerId", protectRoute, photo)
profileRouter.get("/history/:playerId", protectRoute, matchHistory);
profileRouter.get("/gamewin/:playerId", protectRoute, gameWinCount);
profileRouter.get("/gamecount/:playerId", protectRoute, gameCount);
profileRouter.get("/totalwinloss/:playerId", protectRoute, totalWinLoss);
profileRouter.get("/levelxp/:playerId", protectRoute, levelxp);
profileRouter.get("/bioscount/:playerId", protectRoute, biosCount);
profileRouter.get("/otherstats/:playerId", otherStats);

export default profileRouter;