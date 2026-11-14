import express from "express";
import { sendHelpEmail } from "../controllers/email.controller.js";

const helpRouter = express.Router();

helpRouter.post("/send", sendHelpEmail);

export default helpRouter;
