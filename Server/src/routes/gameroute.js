import express from "express";
import {getGames, showGames, createGames} from "../controllers/game.controller.js";

const router = express.Router();

router.post("/create",protectRoute, createGames);
router.get("/get/:_id",protectRoute, getGames);
router.get("/show",protectRoute, showGames);

export default router;