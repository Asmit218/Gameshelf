import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }

    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;