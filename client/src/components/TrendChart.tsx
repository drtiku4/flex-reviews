import type { TrendPoint } from "../types/review";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  data: TrendPoint[];
}

export default function TrendChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="#f0f0f0" />
        <XAxis dataKey="month" />
        <YAxis domain={[0, 5]} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="avgRating"
          name="Avg Rating"
          stroke="#2f855a"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
