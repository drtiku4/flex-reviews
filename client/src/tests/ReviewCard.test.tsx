import { render, screen, fireEvent } from "@testing-library/react";
import ReviewCard from "../components/ReviewCard";
import type { Review } from "../types/review";

const mockReview: Review = {
  reviewId: "1",
  propertyId: "p1",
  listingName: "Test Listing",
  guestName: "John Doe",
  publicReview: "Great stay!",
  ratingOverall: 5,
  category: "Cleanliness",
  channel: "Airbnb",
  createdAt: new Date().toISOString(),
  approved: false,
  showOnWebsite: false,
};

describe("ReviewCard", () => {
  it("renders review details", () => {
    render(
      <ReviewCard
        review={mockReview}
        onApprove={() => {}}
        onToggleShow={() => {}}
      />
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Test Listing")).toBeInTheDocument();
    expect(screen.getByText("Great stay!")).toBeInTheDocument();
  });

  it("calls onApprove when Approve button clicked", () => {
    const onApprove = vi.fn();
    render(
      <ReviewCard
        review={mockReview}
        onApprove={onApprove}
        onToggleShow={() => {}}
      />
    );
    fireEvent.click(screen.getByText("Approve"));
    expect(onApprove).toHaveBeenCalledWith("1", true);
  });

  it("calls onToggleShow when checkbox toggled", () => {
    const onToggleShow = vi.fn();
    render(
      <ReviewCard
        review={mockReview}
        onApprove={() => {}}
        onToggleShow={onToggleShow}
      />
    );
    fireEvent.click(screen.getByLabelText(/Show on Website/i));
    expect(onToggleShow).toHaveBeenCalledWith("1", true);
  });
});
