import { Review } from "../models/review.model.ts";
import type { PipelineStage } from "mongoose";


export async function setApproved(reviewId: string, approved: boolean) {
  const updated = await Review.findOneAndUpdate(
    { reviewId },
    { approved },
    { new: true }
  ).exec();
  return updated;
}


export async function getListingsMetrics() {
  const pipeline: PipelineStage[] = [
    {
      $group: {
        _id: "$listingName",
        listingName: { $first: "$listingName" },
        avgRating: { $avg: "$ratingOverall" },
        count: { $sum: 1 },
        approvedCount: { $sum: { $cond: ["$approved", 1, 0] } }
      }
    } as PipelineStage,
    {
      $project: {
        listingName: 1,
        avgRating: { $round: ["$avgRating", 2] } as any,
        count: 1,
        approvalRate: {
          $cond: [
            { $eq: ["$count", 0] },
            0,
            {
              $round: [
                {
                  $multiply: [
                    { $divide: ["$approvedCount", "$count"] },
                    100
                  ]
                },
                2
              ]
            }
          ]
        } as any
      }
    } as PipelineStage,
    { $sort: { avgRating: -1 } } as PipelineStage
  ];

  const results = await Review.aggregate(pipeline as any).exec();
  return results;
}
