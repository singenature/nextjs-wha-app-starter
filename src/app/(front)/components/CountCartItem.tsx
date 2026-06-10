"use client"

import { useCartStore } from "@/lib/cart-store";

export default function CountCartItem() {
  const totalItems = useCartStore((state) => state.totalItems());

  return <span suppressHydrationWarning>{totalItems}</span>;
}