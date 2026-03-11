import express from "express";
import "dotenv/config";
import path from "path";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route.js";
import profileroute from "./routes/profileroute.js";

import connectDB from "./utils/db.js";

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/match", profileroute)


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