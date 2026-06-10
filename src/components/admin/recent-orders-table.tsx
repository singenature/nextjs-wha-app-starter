'use client';

import type { AdminOrderItem } from "@/lib/services/types/admin-types";
import { cn } from "@/lib/utils";

const thb = new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" });

const STATUS_LABELS: Record<AdminOrderItem["status"], string> = {
  processing: "กำลังดำเนินการ",
  received: "รับแล้ว",
  delivered: "จัดส่งแล้ว",
};

const STATUS_COLORS: Record<AdminOrderItem["status"], string> = {
  processing: "bg-yellow-100 text-yellow-800",
  received: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
};

interface RecentOrdersTableProps {
  orders: AdminOrderItem[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export function RecentOrdersTable({ orders, loading, error, onRetry }: RecentOrdersTableProps) {
  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <p className="text-sm text-red-500">{error}</p>
        <button
          onClick={onRetry}
          className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
        >
          ลองใหม่
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-4 w-8 animate-pulse rounded bg-muted" />
            <div className="h-4 flex-1 animate-pulse rounded bg-muted" />
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return <p className="py-8 text-center text-sm text-muted-foreground">ไม่มีคำสั่งซื้อ</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th className="pb-3 font-medium">#</th>
            <th className="pb-3 font-medium">ลูกค้า</th>
            <th className="pb-3 font-medium">วันที่</th>
            <th className="pb-3 font-medium">สถานะ</th>
            <th className="pb-3 text-right font-medium">ยอดรวม</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-muted/40">
              <td className="py-3 text-muted-foreground">{order.id}</td>
              <td className="py-3 font-medium">{order.customerName}</td>
              <td className="py-3 text-muted-foreground">
                {new Date(order.date).toLocaleDateString("th-TH")}
              </td>
              <td className="py-3">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                    STATUS_COLORS[order.status]
                  )}
                >
                  {STATUS_LABELS[order.status]}
                </span>
              </td>
              <td className="py-3 text-right font-medium">{thb.format(order.totalAmount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
