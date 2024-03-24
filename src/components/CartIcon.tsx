"use client";

import { useCartStore } from "@/utils/store";
import Image from "next/image";

const CartIcon = () => {
  const { totalItems } = useCartStore();
  return (
    <div className="flex items-center gap-2">
      <span>Giỏ hàng ({totalItems})</span>
    </div>
  );
};

export default CartIcon;
