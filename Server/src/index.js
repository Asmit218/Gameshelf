import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./utils/db.js";

import authRouter from "./routes/authroute.js";
import profileRouter from "./routes/profileroute.js";
import roomRouter from "./routes/roomRoute.js";
import lbRouter from "./routes/lbroute.js";
import helpRouter from "./routes/helproute.js";
import settingRouter from "./routes/settingroute.js";

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        process.env.CLIENT_URL
    ].filter(Boolean),
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/leaderboard", lbRouter);
app.use("/api/help", helpRouter);
app.use("/api/profile", settingRouter);

import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./utils/db.js";

import authRouter from "./routes/authroute.js";
import profileRouter from "./routes/profileroute.js";
import roomRouter from "./routes/roomRoute.js";
import lbRouter from "./routes/lbroute.js";
import helpRouter from "./routes/helproute.js";
import settingRouter from "./routes/settingroute.js";

app.use(cors({
    origin: [
        "http://localhost:5173",
        process.env.CLIENT_URL
    ].filter(Boolean),
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/leaderboard", lbRouter);
app.use("/api/help", helpRouter);
app.use("/api/profile", settingRouter);

// Start server
const PORT = process.env.PORT || 7000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on PORT: ${PORT}`);
        });

    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

startServer();
