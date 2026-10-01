"use client";

import React from "react";
import { MapPin, Search } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function StoreFinderBanner() {
  const { setIsStoreLocatorOpen } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-14 h-14 rounded-full bg-red-50 text-[#ef4a23] flex items-center justify-center shrink-0">
            <MapPin className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              25+ Physical Showrooms Across Bangladesh
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Visit our Dhaka, Chattogram, Sylhet, Rajshahi or Khulna branches & test your electric items live!
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsStoreLocatorOpen(true)}
          className="bg-[#ef4a23] hover:bg-[#d43b17] text-white text-sm font-bold px-6 py-3 rounded-xl shadow-sm hover:shadow transition flex items-center gap-2 shrink-0 active:scale-95"
        >
          <span>Find Our Stores</span>
          <Search className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
