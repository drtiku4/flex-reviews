import { Schema, model } from "mongoose";

const ReviewSchema = new Schema({
  reviewId:        { type: String, required: true, unique: true },
  propertyId:      { type: String, required: true },
  listingName:     { type: String, required: true },
  guestName:       { type: String, required: true },
  publicReview:    { type: String, required: true },
  ratingOverall:   { type: Number, required: true },
  category:        { type: String, default: "General" },
  channel:         { type: String, required: true }, 
  createdAt:       { type: Date,   required: true },
  approved:        { type: Boolean, default: false },
  showOnWebsite:   { type: Boolean, default: false },
});

export default model("Review", ReviewSchema);
