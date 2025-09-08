import React, { useEffect, useState } from "react";
import { fetchReviews } from "../services/api";
import type { Review } from "../types/review";
import ReviewCard from "../components/ReviewCard";

export default function PropertyPage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchReviews({ showOnWebsite: true }).then(setReviews).catch(console.error);
  }, []);

  return (
<div className="bg-[#FAFAFA] py-12">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-[#1A3B34] mb-8">Guest Reviews</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {reviews.map((r) => (
        <div
          key={r.reviewId}
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold text-[#1A3B34]">{r.guestName}</h3>
          <p className="text-sm text-gray-500">{r.listingName}</p>
          <p className="mt-3 text-gray-700">{r.publicReview}</p>
          <p className="mt-2 text-[#1A3B34] font-medium">⭐ {r.ratingOverall ?? "N/A"}</p>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}
