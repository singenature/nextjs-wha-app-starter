import { NextRequest, NextResponse } from "next/server";
import { getAdminRevenue } from "@/lib/services/admin-service";
import type { Period } from "@/lib/services/types/admin-types";

const VALID_PERIODS: Period[] = ["7d", "30d", "90d"];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = (searchParams.get("period") ?? "30d") as Period;

    if (!VALID_PERIODS.includes(period)) {
      return NextResponse.json({ error: "ค่า period ไม่ถูกต้อง" }, { status: 400 });
    }

    const data = await getAdminRevenue(period);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการโหลดข้อมูลรายได้" }, { status: 500 });
  }
}
