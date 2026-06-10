import { NextResponse } from "next/server";
import { getAdminStats } from "@/lib/services/admin-service";

export async function GET() {
  try {
    const stats = await getAdminStats();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการโหลดสถิติ" }, { status: 500 });
  }
}
