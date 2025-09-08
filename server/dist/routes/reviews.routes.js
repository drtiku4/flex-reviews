import { Router } from "express";
import { approveReview, updateReview, getListingsMetrics } from "../controllers/reviews.controller.ts";
const router = Router();
router.patch("/:id", updateReview);
router.post("/:id/approve", approveReview);
router.get("/listings", getListingsMetrics);
export default router;
