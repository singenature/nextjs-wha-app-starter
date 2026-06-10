'use client';

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  ShoppingCart,
  Clock,
  Package,
  Users,
  TrendingUp,
} from "lucide-react";
import type {
  AdminOrderItem,
  AdminStats,
  Period,
  RevenuePoint,
} from "@/lib/services/types/admin-types";
import { KpiCard, KpiCardSkeleton } from "@/components/admin/kpi-card";
import { PeriodSelector } from "@/components/admin/period-selector";
import { RecentOrdersTable } from "@/components/admin/recent-orders-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RevenueChart = dynamic(
  () => import("@/components/admin/revenue-chart").then((m) => m.RevenueChart),
  { ssr: false, loading: () => <div className="h-64 animate-pulse rounded-xl bg-muted" /> }
);

const thb = new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" });

export function DashboardClient() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);
  const [revenueLoading, setRevenueLoading] = useState(true);
  const [revenueError, setRevenueError] = useState<string | null>(null);

  const [period, setPeriod] = useState<Period>("30d");

  const [orders, setOrders] = useState<AdminOrderItem[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) throw new Error("โหลดข้อมูลสถิติไม่สำเร็จ");
      setStats(await res.json());
      setStatsError(null);
    } catch (e) {
      setStatsError(e instanceof Error ? e.message : "เกิดข้อผิดพลาด");
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    setOrdersLoading(true);
    try {
      const res = await fetch("/api/admin/orders?limit=5");
      if (!res.ok) throw new Error("โหลดข้อมูลคำสั่งซื้อไม่สำเร็จ");
      const data = await res.json();
      setOrders(data.orders);
      setOrdersError(null);
    } catch (e) {
      setOrdersError(e instanceof Error ? e.message : "เกิดข้อผิดพลาด");
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  const fetchRevenue = useCallback(async (p: Period) => {
    setRevenueLoading(true);
    try {
      const res = await fetch(`/api/admin/revenue?period=${p}`);
      if (!res.ok) throw new Error("โหลดข้อมูลรายได้ไม่สำเร็จ");
      setRevenue(await res.json());
      setRevenueError(null);
    } catch (e) {
      setRevenueError(e instanceof Error ? e.message : "เกิดข้อผิดพลาด");
    } finally {
      setRevenueLoading(false);
    }
  }, []);

  // mount: fetch stats + orders concurrently
  useEffect(() => {
    fetchStats();
    fetchOrders();
  }, [fetchStats, fetchOrders]);

  // period change: refetch revenue
  useEffect(() => {
    fetchRevenue(period);
  }, [period, fetchRevenue]);

  // 30-second auto-refresh for stats + orders
  useEffect(() => {
    const interval = setInterval(() => {
      fetchStats();
      fetchOrders();
    }, 30_000);
    return () => clearInterval(interval);
  }, [fetchStats, fetchOrders]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">แดชบอร์ด</h2>
        <p className="text-sm text-muted-foreground">ภาพรวมร้านค้าของคุณ</p>
      </div>

      {/* KPI Cards */}
      {statsError ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border bg-card p-6 text-center">
          <p className="text-sm text-red-500">{statsError}</p>
          <button
            onClick={fetchStats}
            className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
          >
            ลองใหม่
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {statsLoading || !stats ? (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <KpiCardSkeleton key={i} />
              ))}
            </>
          ) : (
            <>
              <KpiCard
                title="ยอดขายวันนี้"
                value={thb.format(stats.todaySales)}
                icon={TrendingUp}
              />
              <KpiCard
                title="คำสั่งซื้อวันนี้"
                value={stats.todayOrders}
                icon={ShoppingCart}
              />
              <KpiCard
                title="รอดำเนินการ"
                value={stats.pendingOrders}
                icon={Clock}
              />
              <KpiCard
                title="สินค้าทั้งหมด"
                value={stats.totalProducts}
                icon={Package}
              />
              <KpiCard
                title="ผู้ใช้งาน"
                value={stats.totalUsers}
                icon={Users}
              />
            </>
          )}
        </div>
      )}

      {/* Revenue Chart */}
      <Card className="rounded-2xl">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-base">รายได้และคำสั่งซื้อ</CardTitle>
            <PeriodSelector period={period} onChange={setPeriod} />
          </div>
        </CardHeader>
        <CardContent>
          {revenueError ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <p className="text-sm text-red-500">{revenueError}</p>
              <button
                onClick={() => fetchRevenue(period)}
                className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
              >
                ลองใหม่
              </button>
            </div>
          ) : (
            <RevenueChart data={revenue} loading={revenueLoading} />
          )}
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">คำสั่งซื้อล่าสุด</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentOrdersTable
            orders={orders}
            loading={ordersLoading}
            error={ordersError}
            onRetry={fetchOrders}
          />
        </CardContent>
      </Card>
    </div>
  );
}
