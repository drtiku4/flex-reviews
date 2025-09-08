import axios from "axios";
import type { Review, Performance, TrendPoint } from "../types/review";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
});

export async function approveReview(
  id: string,
  approved: boolean
): Promise<Review> {
  const { data } = await api.post<Review>(
    `/api/reviews/${id}/approve`,
    { approved }
  );
  return data;
}

export async function updateReview(
  id: string,
  patch: Partial<Pick<Review, "showOnWebsite">>
): Promise<Review> {
  const { data } = await api.patch<Review>(
    `/api/reviews/${id}`,
    patch
  );
  return data;
}

export async function fetchReviews(filters: Record<string, any>) {
  const { data } = await api.get<Review[]>("/api/reviews", { params: filters });
  return data;
}

export async function fetchPerformance() {
  const { data } = await api.get<Performance[]>("/api/reviews/listings");
  return data;
}

export async function fetchTrend() {
  const { data } = await api.get<TrendPoint[]>("/api/reviews/trend");
  return data;
}
