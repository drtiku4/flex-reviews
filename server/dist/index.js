import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.ts";
import { config } from "./config/index.ts";
import app from "./app.js";
const PORT = process.env.PORT || config.port || 4000;
const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Backend listening on http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error("Failed to start server", err);
        process.exit(1);
    }
};
start();
