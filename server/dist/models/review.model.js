import { Schema, model } from "mongoose";
const reviewSchema = new Schema({
    reviewId: { type: String, required: true, unique: true },
    source: { type: String, default: "hostaway" },
    listingName: { type: String, default: null },
    listingId: { type: String, default: null },
    type: { type: String, default: null },
    status: { type: String, default: null },
    ratingOverall: { type: Number, default: null },
    categories: [
        {
            category: String,
            rating: { type: Number, default: null }
        }
    ],
    channel: { type: String, default: "hostaway" },
    submittedAt: { type: Date, default: null },
    guestName: { type: String, default: null },
    publicReview: { type: String, default: null },
    approved: { type: Boolean, default: false },
    raw: { type: Schema.Types.Mixed, default: {} }
}, { timestamps: true });
export const Review = model("Review", reviewSchema);
