import express from "express";
import cors from "cors";
import hostawayRoutes from "./routes/hostway.routes.ts";
import reviewsRoutes from "./routes/reviews.routes.ts";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api", hostawayRoutes);
app.use("/api/reviews", reviewsRoutes);

app.get("/", (_req, res) => res.json({ status: "ok" }));

export default app;
