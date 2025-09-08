import { useState } from "react";

export interface FilterValues {
  rating_min?: number;
  category?: string;
  channel?: string;
  fromDate?: string;
  toDate?: string;
}

interface Props {
  onFilter: (f: FilterValues) => void;
}

export default function FilterBar({ onFilter }: Props) {
  const [rating, setRating] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [channel, setChannel] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const apply = () => {
    const f: FilterValues = {};
    if (rating !== "") f.rating_min = Number(rating);
    if (category) f.category = category;
    if (channel) f.channel = channel;
    if (fromDate) f.fromDate = fromDate;
    if (toDate) f.toDate = toDate;
    onFilter(f);
  };

  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div>
        <label className="block text-sm">Min Rating</label>
        <select
          value={rating}
          onChange={(e) =>
            setRating(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="border rounded p-1"
        >
          <option value="">Any</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}+
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm">Category</label>
        <input
          type="text"
          value={category ?? ""}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded p-1"
        />
      </div>

      <div>
        <label className="block text-sm">Channel</label>
        <input
          type="text"
          value={channel ?? ""}
          onChange={(e) => setChannel(e.target.value)}
          className="border rounded p-1"
        />
      </div>

      <div>
        <label className="block text-sm">From</label>
        <input
          type="date"
          value={fromDate ?? ""}
          onChange={(e) => setFromDate(e.target.value)}
          className="border rounded p-1"
        />
      </div>

      <div>
        <label className="block text-sm">To</label>
        <input
          type="date"
          value={toDate ?? ""}
          onChange={(e) => setToDate(e.target.value)}
          className="border rounded p-1"
        />
      </div>

      <button
        onClick={apply}
        className="bg-[#1A3B34] text-white px-4 py-2 rounded hover:bg-[#145c4a] transition"
      >
        Apply Filters
      </button>
    </div>
  );
}
