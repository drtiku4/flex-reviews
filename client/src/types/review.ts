export interface Review {
  reviewId: string;
  propertyId: string;
  listingName: string;
  guestName: string;
  publicReview: string;
  ratingOverall: number;
  category: string;
  channel: string; 
  createdAt: string; // ISO date
  approved?: boolean;
  showOnWebsite?: boolean;
}

export interface Performance {
  propertyId: string;
  listingName: string;
  avgRating: number;
  totalReviews: number;
  approvalRate: number; // 0–1
}

export interface TrendPoint {
  month: string; // e.g. "2025-08"
  avgRating: number;
  reviewCount: number;
}
