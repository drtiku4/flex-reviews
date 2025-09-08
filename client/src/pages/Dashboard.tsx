import { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import TrendChart from "../components/TrendChart";
import ReviewCard from "../components/ReviewCard";
import {
  fetchReviews,
  fetchPerformance,
  fetchTrend,
  approveReview,
  updateReview,
} from "../services/api";
import type { FilterValues } from "../components/FilterBar";
import type { Review, Performance, TrendPoint } from "../types/review";

export default function Dashboard() {
  const [filters, setFilters] = useState<FilterValues>({});
  const [reviews, setReviews] = useState<Review[]>([]);
  const [performance, setPerformance] = useState<Performance[]>([]);
  const [trendData, setTrendData] = useState<TrendPoint[]>([]);

  useEffect(() => {
    fetchPerformance()
      .then((data) => Array.isArray(data) && setPerformance(data))
      .catch(console.error);

    fetchTrend()
      .then((data) => Array.isArray(data) && setTrendData(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchReviews(filters)
      .then((data) => Array.isArray(data) && setReviews(data))
      .catch(console.error);
  }, [filters]);

  const handleApprove = async (id: string, approved: boolean) => {
    try {
      const updated = await approveReview(id, approved);
      setReviews((prev) =>
        prev.map((r) => (r.reviewId === id ? updated : r))
      );
    } catch (err) {
      console.error("Error approving review:", err);
    }
  };

  const handleToggleShow = async (id: string, show: boolean) => {
    try {
      const updated = await updateReview(id, { showOnWebsite: show });
      setReviews((prev) =>
        prev.map((r) => (r.reviewId === id ? updated : r))
      );
    } catch (err) {
      console.error("Error toggling showOnWebsite:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1A3B34]">Manager Dashboard</h1>
          <nav className="flex gap-6 text-sm text-gray-600">
            <span className="hover:text-[#1A3B34] cursor-pointer">Properties</span>
            <span className="hover:text-[#1A3B34] cursor-pointer">Reviews</span>
            <span className="hover:text-[#1A3B34] cursor-pointer">Settings</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-10">
        {/* Performance Metrics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {performance.map((p) => (
            <div
              key={p.propertyId}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-[#1A3B34]">{p.listingName}</h2>
              <p className="mt-2 text-sm text-gray-500">Total Reviews: {p.totalReviews}</p>
              <p className="mt-1 text-sm text-gray-500">
                Avg Rating: {p.avgRating != null ? p.avgRating.toFixed(1) : "N/A"}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Approval Rate: {(p.approvalRate * 100).toFixed(0)}%
              </p>
            </div>
          ))}
        </section>

        {/* Trend Chart */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-[#1A3B34] mb-4">Rating Trends</h2>
          <TrendChart data={trendData} />
        </section>

        {/* Reviews */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#1A3B34]">All Reviews</h2>
            <FilterBar onFilter={setFilters} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <ReviewCard
                key={r.reviewId}
                review={r}
                onApprove={handleApprove}
                onToggleShow={handleToggleShow}
              />
            ))}
            {reviews.length === 0 && (
              <p className="text-gray-500 col-span-full">
                No reviews match the current filters.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
