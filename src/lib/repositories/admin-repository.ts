import prisma from "@/lib/prisma";

export async function fetchAdminStats() {
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  const [todaySalesResult, todayOrdersCount, pendingOrdersCount, totalProducts, totalUsers] =
    await Promise.all([
      prisma.orders.aggregate({
        where: { date: { gte: startOfToday, lt: endOfToday } },
        _sum: { total_amount: true },
      }),
      prisma.orders.count({
        where: { date: { gte: startOfToday, lt: endOfToday } },
      }),
      prisma.orders.count({
        where: { status: "processing" },
      }),
      prisma.products.count(),
      prisma.user.count(),
    ]);

  return {
    todaySales: Number(todaySalesResult._sum.total_amount ?? 0),
    todayOrders: todayOrdersCount,
    pendingOrders: pendingOrdersCount,
    totalProducts,
    totalUsers,
  };
}

export async function fetchRevenueData(period: "7d" | "30d" | "90d") {
  const days = period === "7d" ? 7 : period === "30d" ? 30 : 90;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  startDate.setHours(0, 0, 0, 0);

  const orders = await prisma.orders.findMany({
    where: { date: { gte: startDate } },
    select: { date: true, total_amount: true },
    orderBy: { date: "asc" },
  });

  const groupedMap = new Map<string, { revenue: number; orders: number }>();

  for (const order of orders) {
    if (!order.date) continue;
    const dateKey = order.date.toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
    });
    const existing = groupedMap.get(dateKey) ?? { revenue: 0, orders: 0 };
    existing.revenue += Number(order.total_amount ?? 0);
    existing.orders += 1;
    groupedMap.set(dateKey, existing);
  }

  return Array.from(groupedMap.entries()).map(([date, data]) => ({
    date,
    revenue: data.revenue,
    orders: data.orders,
  }));
}

export async function fetchRecentOrders(limit: number = 5) {
  const [orders, total] = await Promise.all([
    prisma.orders.findMany({
      take: limit,
      orderBy: { date: "desc" },
      include: { customers: true },
    }),
    prisma.orders.count(),
  ]);

  return {
    orders: orders.map((order) => ({
      id: order.id,
      customerName: order.customers?.name ?? "ไม่ระบุ",
      status: (order.status ?? "processing") as "delivered" | "received" | "processing",
      totalAmount: Number(order.total_amount ?? 0),
      date: order.date?.toISOString() ?? new Date().toISOString(),
    })),
    total,
  };
}
