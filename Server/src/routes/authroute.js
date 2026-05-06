import express from "express";
import { signup, login, logout, updateProfilePhoto } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.get("/check", protectRoute, (req, res) => {
    res.set("Cache-Control", "no-store");
    res.json({
        _id: req.user._id,
        playerId: req.user.playerId,
        userName: req.user.userName,
    });
});

authRouter.post("/profile-photo", protectRoute, updateProfilePhoto);

export default authRouter;