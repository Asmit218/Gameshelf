import express from 'express';
import { createRoom, deleteRoom, showRoom } from '../controllers/room.controller.js';
import {dummyMiddleware} from "../middleware/dummyMiddleware.js";

const roomRouter = express.Router();

roomRouter.get("/show" ,dummyMiddleware, showRoom);
roomRouter.post("/create",dummyMiddleware, createRoom);
roomRouter.delete("/delete/:id",dummyMiddleware, deleteRoom);

export default roomRouter;