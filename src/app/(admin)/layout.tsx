import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

const promptFont = Prompt({
  weight: ["400", "500", "700"],
  subsets: ["thai"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ผู้ดูแลระบบ",
  description: "Admin Dashboard",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${promptFont.className} font-sans`}>
      <body className="bg-gray-50">
        <div className="flex min-h-screen">
          <aside className="w-60 shrink-0 border-r bg-white shadow-sm">
            <div className="flex h-16 items-center border-b px-6">
              <span className="text-lg font-bold tracking-tight">Admin Panel</span>
            </div>
            <nav className="p-4">
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    แดชบอร์ด
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
          <div className="flex flex-1 flex-col overflow-hidden">
            <header className="flex h-16 items-center border-b bg-white px-6">
              <h1 className="text-sm font-medium text-muted-foreground">ระบบจัดการร้านค้า</h1>
            </header>
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </div>
        </div>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
