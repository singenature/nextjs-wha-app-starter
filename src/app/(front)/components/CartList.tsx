"use client"

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCartStore } from "@/lib/cart-store";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const priceFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0,
});

export default function CartList() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.totalPrice());

  if (items.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#f2f4f5] px-6 py-20">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#e6f0ff]">
            <ShoppingBag className="size-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-[#001f3e]">ตะกร้าสินค้าว่างเปล่า</h2>
          <p className="mt-2 text-[#66798b]">ยังไม่มีสินค้าในตะกร้า เลือกซื้อสินค้าเลย!</p>
          <Button
            asChild
            className="mt-8 rounded-[100px] bg-primary px-8 font-semibold text-white hover:bg-[#0053cc] transition-colors"
          >
            <Link href="/product">เลือกซื้อสินค้า</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f2f4f5] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm text-[#66798b] transition-colors hover:text-[#001f3e]"
          >
            <ArrowLeft className="size-4" /> ย้อนกลับ
          </button>
        </div>
        <h1 className="text-3xl font-bold tracking-[-0.04em] text-[#001f3e]">
          ตะกร้าสินค้า
        </h1>
        <p className="mt-1 text-sm text-[#66798b]">{items.length} รายการ</p>

        {/* Cart table */}
        <div className="mt-6 overflow-hidden rounded border border-[#e6e9ec] bg-white shadow-[0_0.125rem_0.25rem_rgba(0,0,0,0.075)]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#f2f4f5]">
                <TableHead className="font-semibold text-[#001f3e]">รหัส</TableHead>
                <TableHead className="font-semibold text-[#001f3e]">ชื่อสินค้า</TableHead>
                <TableHead className="font-semibold text-[#001f3e]">ราคา/ชิ้น</TableHead>
                <TableHead className="font-semibold text-[#001f3e]">จำนวน</TableHead>
                <TableHead className="font-semibold text-[#001f3e]">รวม</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.productId} className="border-b border-[#e6e9ec]">
                  <TableCell className="text-sm text-[#66798b]">#{item.productId}</TableCell>
                  <TableCell className="font-medium text-[#001f3e]">{item.name}</TableCell>
                  <TableCell className="text-[#334c65]">{priceFormatter.format(item.price)}</TableCell>
                  <TableCell>
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#e6f0ff] text-sm font-semibold text-primary">
                      {item.qty}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold text-[#001f3e]">
                    {priceFormatter.format(item.price * item.qty)}
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="rounded p-1.5 text-[#66798b] transition-colors hover:bg-[#fce8ec] hover:text-[#e31748]"
                      aria-label="ลบสินค้า"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Order summary */}
        <div className="mt-6 rounded border border-[#e6e9ec] bg-white p-6 shadow-[0_0.125rem_0.25rem_rgba(0,0,0,0.075)]">
          <div className="flex items-center justify-between">
            <span className="text-lg text-[#334c65]">รวมทั้งหมด</span>
            <span className="text-3xl font-bold text-[#001f3e]">
              {priceFormatter.format(totalPrice)}
            </span>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              className="rounded-[100px] border border-[#e31748] bg-transparent font-semibold text-[#e31748] hover:bg-[#fce8ec] transition-colors"
              onClick={() => clearCart()}
            >
              ลบสินค้าทั้งหมด
            </Button>
            <Button
              className="rounded-[100px] bg-[#03ca77] px-8 font-semibold text-white hover:bg-[#02a25f] transition-colors"
              onClick={() => {
                clearCart();
                router.replace("/product");
              }}
            >
              ยืนยันการสั่งซื้อ
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
