import express from "express";

import { dummyMiddleware } from "../middleware/dummyMiddleware.js";

import {getGame, showGames, createGames, updateGames, deleteGames} from "../controllers/game.controller.js";

const router = express.Router();

router.post("/create",dummyMiddleware, createGames);
router.get("/get/:_id",dummyMiddleware, getGame);
router.get("/show",dummyMiddleware, showGames);
router.put("/update/:_id",dummyMiddleware, updateGames);
router.delete("/delete/:_id",dummyMiddleware, deleteGames);

export default router;