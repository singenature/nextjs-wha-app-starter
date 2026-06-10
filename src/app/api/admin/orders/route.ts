import { NextRequest, NextResponse } from "next/server";
import { getAdminOrders } from "@/lib/services/admin-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "5", 10), 100);

    const data = await getAdminOrders(isNaN(limit) ? 5 : limit);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการโหลดคำสั่งซื้อ" }, { status: 500 });
  }
}
