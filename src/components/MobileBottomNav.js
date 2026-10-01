"use client";

import React from "react";
import { useShop } from "@/context/ShopContext";
import { Gift, Zap, Cpu, Phone, User } from "lucide-react";

export default function MobileBottomNav() {
  const {
    setIsElectricBuilderOpen,
    openAuthModal,
    user,
    setSearchQuery,
    showToast
  } = useShop();

  const handleOffersClick = () => {
    const elem = document.getElementById("featured-products");
    elem?.scrollIntoView({ behavior: "smooth" });
    showToast("Browsing Special Offers");
  };

  const handleDealsClick = () => {
    setSearchQuery("Solar & IPS");
    const elem = document.getElementById("featured-products");
    elem?.scrollIntoView({ behavior: "smooth" });
    showToast("Special Hot Deals");
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#081621] border-t border-gray-800 text-white shadow-2xl pb-[env(safe-area-inset-bottom)]">
      {/* 5 Equal Columns matching Screenshot 1 */}
      <div className="grid grid-cols-5 h-14 items-center px-1">
        
        {/* 1. Offers */}
        <button
          type="button"
          onClick={handleOffersClick}
          className="flex flex-col items-center justify-center gap-1 text-gray-300 hover:text-[#ef4a23] transition active:scale-95"
        >
          <Gift className="w-5 h-5" />
          <span className="text-[10px] font-medium leading-none">Offers</span>
        </button>

        {/* 2. Hot Deals */}
        <button
          type="button"
          onClick={handleDealsClick}
          className="flex flex-col items-center justify-center gap-1 text-gray-300 hover:text-amber-400 transition active:scale-95"
        >
          <Zap className="w-5 h-5" />
          <span className="text-[10px] font-medium leading-none">Hot Deals</span>
        </button>

        {/* 3. PC Builder */}
        <button
          type="button"
          onClick={() => setIsElectricBuilderOpen(true)}
          className="flex flex-col items-center justify-center gap-1 text-gray-300 hover:text-cyan-400 transition active:scale-95"
        >
          <Cpu className="w-5 h-5" />
          <span className="text-[10px] font-medium leading-none">PC Builder</span>
        </button>

        {/* 4. Helpline (16793) */}
        <a
          href="tel:16793"
          className="flex flex-col items-center justify-center gap-1 text-gray-300 hover:text-emerald-400 transition active:scale-95"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-medium leading-none">Helpline</span>
        </a>

        {/* 5. Account */}
        <button
          type="button"
          onClick={() => openAuthModal("login")}
          className="flex flex-col items-center justify-center gap-1 text-gray-300 hover:text-white transition active:scale-95"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium leading-none truncate max-w-[50px]">
            {user ? user.name.split(" ")[0] : "Account"}
          </span>
        </button>

      </div>
    </nav>
  );
}
