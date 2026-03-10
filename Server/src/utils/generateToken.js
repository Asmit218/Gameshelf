import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (userId, res) => {
    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({ userId}, JWT_SECRET, {
        expiresIn: '1d',
    });
    res.cookie("jwt", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
};