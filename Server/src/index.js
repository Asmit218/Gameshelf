import express from "express";
import "dotenv/config";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./utils/db.js";

import authRouter from "./routes/authroute.js";
import profileRouter from "./routes/profileroute.js";
import gameRouter from "./routes/gameroute.js";
import roomRouter from "./routes/roomRoute.js";
import lbRouter from "./routes/lbroute.js";

const app = express();
const __dirname = path.resolve();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/match", profileRouter);
app.use("/api/games", gameRouter);
app.use("/api/rooms",roomRouter);
app.use("/api/leaderboard",lbRouter);


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"./Client/dist")));
    // Need to fix for React Router
    app.get("/",(req,res)=>{ 
        res.sendFile(path.join(__dirname,"./Client/dist/index.html"));
    });
}

const PORT = process.env.PORT || 7000;
app.listen(PORT,()=>{
    console.log("Server is running on PORT:" + PORT);
    connectDB();
});