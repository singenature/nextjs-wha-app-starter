import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (!user || user.role !== "admin") {
    redirect("/");
  }

  return <DashboardClient />;
}
