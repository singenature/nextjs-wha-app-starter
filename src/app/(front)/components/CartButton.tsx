"use client"

import { Button } from "@/components/ui/button";
import type { ProductCardItem } from "@/components/features-product";
import { useCartStore } from "@/lib/cart-store";
import { ShoppingCart } from "lucide-react";

type Props = {
  product: ProductCardItem;
};

export default function CartButton({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddItem = () => {
    addItem({
      productId: String(product.id),
      name: product.name,
      price: product.price,
      qty: 1,
    });
  };

  return (
    <Button
      className="w-full rounded-[100px] bg-primary font-semibold text-white shadow-sm hover:bg-[#0053cc] transition-colors"
      onClick={handleAddItem}
    >
      <ShoppingCart className="size-4" /> หยิบใส่ตะกร้า
    </Button>
  );
}
