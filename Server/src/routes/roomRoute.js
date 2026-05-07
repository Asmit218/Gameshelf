import express from 'express';
import { createRoom, deleteRoom, showRoom, showMyRoom, joinRoom } from '../controllers/room.controller.js';
import {protectRoute} from "../middleware/protectRoute.js";

const roomRouter = express.Router();

roomRouter.get("/show" ,protectRoute, showRoom);
roomRouter.get("/myroom" ,protectRoute, showMyRoom);
roomRouter.post("/create",protectRoute, createRoom);
roomRouter.post("/join/:roomid",protectRoute, joinRoom);
roomRouter.delete("/delete/:id",protectRoute, deleteRoom);

export default roomRouter;