import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.ts";
import { syncHostawayReviews } from "./services/hostaway.service.ts";
const run = async () => {
    await connectDB();
    const docs = await syncHostawayReviews();
    console.log("Seeded hostaway reviews:", docs.length);
    process.exit(0);
};
run().catch((err) => {
    console.error(err);
    process.exit(1);
});
