import { Router } from "express";
import { getHostawayReviews } from "../controllers/hostaway.controller.ts";

const router = Router();

router.get("/hostaway", getHostawayReviews);

export default router