import { Router } from "express";
import {
  approveReview,
  updateReview,
  getListingsMetrics,
  getReviewTrends,
  fetchReviews        
} from "../controllers/reviews.controller.ts"

const router = Router();

router.patch("/:id", updateReview);
router.post("/:id/approve", approveReview);

router.get("/listings", getListingsMetrics);
router.get("/trend", getReviewTrends);
router.get("/", fetchReviews);


export default router;