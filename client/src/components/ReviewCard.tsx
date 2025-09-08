import type { Review } from "../types/review";

interface Props {
  review: Review;
  onApprove: (id: string, approved: boolean) => void;
  onToggleShow: (id: string, show: boolean) => void;
}

export default function ReviewCard({ review, onApprove, onToggleShow }: Props) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-[#1A3B34]">{review.guestName}</h3>
        <p className="text-sm text-gray-500">{review.listingName}</p>
        <p className="mt-3 text-gray-700">{review.publicReview}</p>
        <p className="mt-2 text-[#1A3B34] font-medium">⭐ {review.ratingOverall ?? "N/A"}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => onApprove(review.reviewId, true)}
          className={`px-3 py-1 rounded-full text-sm ${
            review.approved ? "bg-[#1A3B34] text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Approve
        </button>
        <button
          onClick={() => onApprove(review.reviewId, false)}
          className={`px-3 py-1 rounded-full text-sm ${
            review.approved === false ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Reject
        </button>
        <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
          <input
            type="checkbox"
            checked={!!review.showOnWebsite}
            onChange={(e) => onToggleShow(review.reviewId, e.target.checked)}
            className="accent-[#1A3B34]"
          />
          Show on Website
        </label>
      </div>
    </div>
  );
}
