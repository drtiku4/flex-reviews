import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "../components/FilterBar";

describe("FilterBar", () => {
  it("calls onFilter with correct values", () => {
    const onFilter = vi.fn();
    render(<FilterBar onFilter={onFilter} />);

    fireEvent.change(screen.getByLabelText(/Min Rating/i), {
      target: { value: "4" },
    });
    fireEvent.change(screen.getByLabelText(/Category/i), {
      target: { value: "Cleanliness" },
    });
    fireEvent.change(screen.getByLabelText(/Channel/i), {
      target: { value: "Airbnb" },
    });
    fireEvent.change(screen.getByLabelText(/From/i), {
      target: { value: "2025-01-01" },
    });
    fireEvent.change(screen.getByLabelText(/To/i), {
      target: { value: "2025-02-01" },
    });

    fireEvent.click(screen.getByText(/Apply Filters/i));

    expect(onFilter).toHaveBeenCalledWith({
      rating_min: 4,
      category: "Cleanliness",
      channel: "Airbnb",
      fromDate: "2025-01-01",
      toDate: "2025-02-01",
    });
  });
});
