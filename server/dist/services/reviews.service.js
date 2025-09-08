import { Review } from "../models/review.model.ts";
export async function setApproved(reviewId, approved) {
    const updated = await Review.findOneAndUpdate({ reviewId }, { approved }, { new: true }).exec();
    return updated;
}
export async function getListingsMetrics() {
    const pipeline = [
        {
            $group: {
                _id: "$listingName",
                listingName: { $first: "$listingName" },
                avgRating: { $avg: "$ratingOverall" },
                count: { $sum: 1 },
                approvedCount: { $sum: { $cond: ["$approved", 1, 0] } }
            }
        },
        {
            $project: {
                listingName: 1,
                avgRating: { $round: ["$avgRating", 2] },
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
                }
            }
        },
        { $sort: { avgRating: -1 } }
    ];
    const results = await Review.aggregate(pipeline).exec();
    return results;
}
