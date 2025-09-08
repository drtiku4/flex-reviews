import type { Request, Response } from "express"; 
import axios from "axios";
import Review from "../models/review.model.ts";

export async function getHostawayReviews(req: Request, res: Response) {
  try {
    const resp = await axios.get("https://api.hostaway.com/v1/reviews", {
      headers: { Authorization: `Bearer ${process.env.HOSTAWAY_TOKEN}` },
    });

    const reviews = resp.data.reviews.map((h: any) => ({
      reviewId:      h.id,
      propertyId:    h.property.id,
      listingName:   h.property.name,
      guestName:     `${h.guest.firstName} ${h.guest.lastName}`,
      publicReview:  h.reviewText,
      ratingOverall: h.rating,
      category:      h.category || "General",
      channel:       "Hostaway",
      createdAt:     new Date(h.date),
    }));

    const ops = reviews.map((r: any) => ({
      updateOne: {
        filter: { reviewId: r.reviewId },
        update: { $setOnInsert: r },
        upsert: true,
      },
    }));
    await Review.bulkWrite(ops);

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch Hostaway reviews" });
  }
}
