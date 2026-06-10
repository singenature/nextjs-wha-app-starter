import {
  fetchAdminStats,
  fetchRecentOrders,
  fetchRevenueData,
} from "@/lib/repositories/admin-repository";
import type {
  AdminOrdersResponse,
  AdminStats,
  Period,
  RevenuePoint,
} from "@/lib/services/types/admin-types";

export async function getAdminStats(): Promise<AdminStats> {
  return fetchAdminStats();
}

export async function getAdminRevenue(period: Period): Promise<RevenuePoint[]> {
  return fetchRevenueData(period);
}

export async function getAdminOrders(limit: number = 5): Promise<AdminOrdersResponse> {
  return fetchRecentOrders(limit);
}
