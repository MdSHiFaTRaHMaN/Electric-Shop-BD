"use client";

import React from "react";
import { useShop } from "@/context/ShopContext";
import { ShoppingBag, ArrowUp } from "lucide-react";

export default function FloatingActions() {
  const { cartTotalCount, setIsCartOpen } = useShop();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed right-3 sm:right-4 bottom-20 lg:bottom-6 z-40 flex flex-col gap-2.5 items-end">
      
      {/* Scroll to Top */}
      <button
        type="button"
        onClick={scrollToTop}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-gray-700 shadow-lg hover:shadow-xl border border-gray-200 flex items-center justify-center hover:bg-[#ef4a23] hover:text-white transition active:scale-95 group"
        title="Scroll to Top"
      >
        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Floating Cart Button (Visible on Desktop only, on mobile it is in MobileBottomNav) */}
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        className="hidden lg:flex h-14 bg-[#ef4a23] hover:bg-[#d43b17] text-white px-4 rounded-full shadow-2xl items-center gap-2.5 transition-all hover:scale-105 group relative animate-bounce"
        style={{ animationDuration: "3s" }}
      >
        <ShoppingBag className="w-6 h-6 text-white group-hover:scale-110 transition-transform fill-white/20" />
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold leading-tight">CART</span>
          <span className="text-[10px] text-orange-200 font-semibold">{cartTotalCount} Items</span>
        </div>
      </button>

    </div>
  );
}
