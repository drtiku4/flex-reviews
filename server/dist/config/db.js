import mongoose from "mongoose";
import { config } from "./index.ts";
export const connectDB = async () => {
    const uri = config.mongoUri;
    try {
        await mongoose.connect(uri, {});
        console.log("MongoDB connected");
    }
    catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
    }
};
