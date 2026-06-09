import { ArrowUpRight, CirclePlay, ShieldCheck, Zap, Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-gradient-to-br from-[#f2f7ff] via-white to-white px-6 py-20">

      {/* Decorative blur circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-32 right-[-5%] h-96 w-96 rounded-full bg-[#e6f0ff] opacity-60 blur-3xl" />
        <div className="absolute bottom-0 left-[-5%] h-64 w-64 rounded-full bg-[#cdf4e4] opacity-40 blur-3xl" />
        <div className="absolute bottom-1/3 right-[10%] h-48 w-48 rounded-full bg-[#fff6ea] opacity-40 blur-2xl" />
      </div>

      <div className="relative z-10 max-w-3xl text-center">
        {/* Announcement badge */}
        <Badge
          asChild
          className="rounded-full border border-[#cce1ff] bg-[#e6f0ff] px-4 py-1.5 text-sm font-medium text-primary hover:bg-[#cce1ff]"
        >
          <Link href="#">
            ใหม่! เพิ่มระบบชำระเงินออนไลน์ <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Badge>

        {/* Heading */}
        <h1 className="mx-auto mt-6 max-w-2xl font-bold text-4xl tracking-[-0.04em] text-[#001f3e] sm:text-[2.75rem] md:text-6xl/[1.2]">
          ระบบ E-Commerce
          <span className="block text-primary">สำหรับยุคใหม่</span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-[#66798b] text-xl md:text-2xl/normal">
          สร้างประสบการณ์การซื้อขายออนไลน์ที่ราบรื่น
          รวดเร็ว และปลอดภัย ด้วยเทคโนโลยีล่าสุด
        </p>

        {/* CTA buttons */}
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

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-3 gap-6 border-t border-[#e6e9ec] pt-10">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#001f3e]">500+</div>
            <div className="mt-1 text-sm text-[#66798b]">สินค้าพรีเมียม</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#001f3e]">10k+</div>
            <div className="mt-1 text-sm text-[#66798b]">ลูกค้าพึงพอใจ</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#001f3e]">99%</div>
            <div className="mt-1 text-sm text-[#66798b]">ความพึงพอใจ</div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-[#66798b]">
          <span className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-[#03ca77]" />
            ปลอดภัย 100%
          </span>
          <span className="flex items-center gap-2">
            <Zap className="size-4 text-primary" />
            ชำระง่าย รวดเร็ว
          </span>
          <span className="flex items-center gap-2">
            <Star className="size-4 text-[#faa828]" />
            รับคะแนนสะสมทุกออเดอร์
          </span>
        </div>
      </div>
    </div>
  );
}
