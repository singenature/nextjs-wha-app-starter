import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white px-6 py-20">

      <div className="relative z-10 max-w-3xl text-center">
        <Badge
          asChild
          className="rounded-full border border-[#cce1ff] bg-[#e6f0ff] px-4 py-1.5 text-sm font-medium text-primary hover:bg-[#cce1ff]"
        >
          <Link href="#">
            Just released v1.0.0 <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Badge>

        <h1 className="mx-auto mt-6 max-w-2xl font-bold text-4xl tracking-[-0.04em] text-[#001f3e] sm:text-[2.75rem] md:text-6xl/[1.2]">
          ระบบ E-Commerce
          <span className="block text-primary">สำหรับยุคใหม่</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[#66798b] text-xl md:text-2xl/normal">
          สร้างประสบการณ์การซื้อขายออนไลน์ที่ราบรื่น
          รวดเร็ว และปลอดภัย ด้วยเทคโนโลยีล่าสุด
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-[100px] bg-primary px-8 font-semibold text-white shadow-sm hover:bg-[#0053cc] transition-colors"
          >
            <Link href="/product">
              เลือกซื้อสินค้า <ArrowUpRight className="h-5! w-5!" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="rounded-[100px] border border-primary bg-transparent px-8 font-semibold text-primary shadow-none hover:bg-primary hover:text-white transition-colors"
            variant="outline"
          >
            <Link href="/course">
              <CirclePlay className="h-5! w-5!" /> ดูหลักสูตร
            </Link>
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-sm text-[#66798b]">
          <span className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#03ca77]" />
            ปลอดภัย 100%
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-primary" />
            ชำระง่าย รวดเร็ว
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#faa828]" />
            รับคะแนนสะสมทุกออเดอร์
          </span>
        </div>
      </div>
    </div>
  );
}
