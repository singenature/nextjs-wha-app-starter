'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { RevenuePoint } from "@/lib/services/types/admin-types";

const thb = new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" });

interface RevenueChartProps {
  data: RevenuePoint[];
  loading: boolean;
}

export function RevenueChart({ data, loading }: RevenueChartProps) {
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-48 w-full animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-muted-foreground">ไม่มีข้อมูลรายได้ในช่วงนี้</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          stroke="hsl(var(--muted-foreground))"
        />
        <YAxis
          yAxisId="revenue"
          tickFormatter={(v) => thb.format(v)}
          tick={{ fontSize: 11 }}
          stroke="hsl(var(--muted-foreground))"
          width={90}
        />
        <YAxis
          yAxisId="orders"
          orientation="right"
          tick={{ fontSize: 11 }}
          stroke="hsl(var(--muted-foreground))"
          width={40}
        />
        <Tooltip
          formatter={(value, name) =>
            name === "รายได้" ? thb.format(Number(value)) : value
          }
          contentStyle={{
            borderRadius: "0.5rem",
            border: "1px solid hsl(var(--border))",
            background: "hsl(var(--card))",
            color: "hsl(var(--card-foreground))",
          }}
        />
        <Legend />
        <Line
          yAxisId="revenue"
          type="monotone"
          dataKey="revenue"
          name="รายได้"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
        <Line
          yAxisId="orders"
          type="monotone"
          dataKey="orders"
          name="คำสั่งซื้อ"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
