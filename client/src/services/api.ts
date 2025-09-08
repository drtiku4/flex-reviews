import axios from "axios";
import type { Review, Performance, TrendPoint } from "../types/review";

export async function approveReview(
  id: string,
  approved: boolean
): Promise<Review> {
  const { data } = await axios.post<Review>(
    `/api/reviews/${id}/approve`,
    { approved }
  );
  return data;
}

export async function updateReview(
  id: string,
  patch: Partial<Pick<Review, "showOnWebsite">>
): Promise<Review> {
  const { data } = await axios.patch<Review>(
    `/api/reviews/${id}`,
    patch
  );
  return data;
}
export async function fetchReviews(filters: Record<string, any>) {
  const { data } = await axios.get<Review[]>("/api/reviews", { params: filters });
  return data;
}

export async function fetchPerformance() {
  const { data } = await axios.get<Performance[]>("/api/reviews/listings");
  return data;
}

export async function fetchTrend() {
  const { data } = await axios.get<TrendPoint[]>("/api/reviews/trend");
  return data;
}