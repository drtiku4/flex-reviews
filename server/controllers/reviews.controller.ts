import type { Request, Response } from "express";
import Review from "../models/review.model.ts";

export async function fetchReviews(req: Request, res: Response): Promise<void> {
  const {
    rating_min,
    category,
    channel,
    fromDate,
    toDate,
    sortBy = "createdAt",
    sortDir = "desc",
  } = req.query as Record<string, string>;

  const filter: Record<string, any> = {};
  if (rating_min) filter.ratingOverall = { $gte: Number(rating_min) };
  if (category) filter.category = category;
  if (channel) filter.channel = channel;
  if (fromDate || toDate) {
    filter.createdAt = {};
    if (fromDate) filter.createdAt.$gte = new Date(fromDate);
    if (toDate) filter.createdAt.$lte = new Date(toDate);
  }

  const sortField = sortBy;
  const sortOrder = sortDir === "asc" ? 1 : -1;

  try {
    const reviews = await Review.find(filter).sort({ [sortField]: sortOrder }).lean();
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching reviews" });
  }
}

// PATCH /api/reviews/:id
export async function updateReview(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const updated = await Review.findOneAndUpdate(
      { reviewId: id },
      { $set: req.body },
      { new: true }
    ).lean();
    if (!updated) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating review" });
  }
}

// POST /api/reviews/:id/approve
export async function approveReview(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { approved } = req.body;
  if (typeof approved !== "boolean") {
    res.status(400).json({ message: "approved must be boolean" });
    return;
  }
  try {
    const updated = await Review.findOneAndUpdate(
      { reviewId: id },
      { $set: { approved } },
      { new: true }
    ).lean();
    if (!updated) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error approving review" });
  }
}

// GET /api/reviews/listings
export async function getListingsMetrics(req: Request, res: Response): Promise<void> {
  try {
    const metrics = await Review.aggregate([
      {
        $group: {
          _id: { propertyId: "$propertyId", listingName: "$listingName" },
          avgRating: { $avg: "$ratingOverall" },
          totalReviews: { $sum: 1 },
          approvedCount: {
            $sum: { $cond: [{ $eq: ["$approved", true] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          propertyId: "$_id.propertyId",
          listingName: "$_id.listingName",
          avgRating: 1,
          totalReviews: 1,
          approvalRate: { $divide: ["$approvedCount", "$totalReviews"] },
        },
      },
    ]);
    res.json(metrics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error computing metrics" });
  }
}

// GET /api/reviews/trend
export async function getReviewTrends(req: Request, res: Response): Promise<void> {
  try {
    const trend = await Review.aggregate([
      { $match: { approved: true } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          avgRating: { $avg: "$ratingOverall" },
          reviewCount: { $sum: 1 },
        },
      },
      {
        $project: {
          month: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              {
                $cond: [
                  { $lt: ["$_id.month", 10] },
                  { $concat: ["0", { $toString: "$_id.month" }] },
                  { $toString: "$_id.month" },
                ],
              },
            ],
          },
          avgRating: 1,
          reviewCount: 1,
        },
      },
      { $sort: { month: 1 } },
    ]);
    res.json(trend);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating trend data" });
  }
}
