export interface AdminStats {
  todaySales: number;
  todayOrders: number;
  pendingOrders: number;
  totalProducts: number;
  totalUsers: number;
}

export interface RevenuePoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface AdminOrderItem {
  id: number;
  customerName: string;
  status: 'delivered' | 'received' | 'processing';
  totalAmount: number;
  date: string;
}

export type Period = '7d' | '30d' | '90d';

export interface AdminOrdersResponse {
  orders: AdminOrderItem[];
  total: number;
}
