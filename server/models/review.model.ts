export type ReviewCategory = {
  category: string;
  rating: number | null;
};

export type NormalizedReview = {
  id: string;
  source: 'hostaway' | 'google' | string;
  listingName: string | null;
  listingId?: string | null;
  type?: string | null;
  status?: string | null;
  ratingOverall: number | null;
  categories: ReviewCategory[];
  channel: string;
  submittedAt: string | null; 
  guestName: string | null;
  publicReview: string | null;
  approved: boolean;
};
