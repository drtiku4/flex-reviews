export type PropertyMetrics = {
  listingId: string;
  listingName: string;
  avgRating: number | null;
  reviewsCount: number;
  positivePct: number; 
  trend: number[]; 
  topNegativeCategories: { category: string; count: number }[];
};
