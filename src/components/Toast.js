"use client";

import React from "react";
import { useShop } from "@/context/ShopContext";
import { CheckCircle2, Zap } from "lucide-react";

export default function Toast() {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 right-4 z-50 bg-[#081621] text-white px-4 py-3 rounded-xl shadow-2xl border border-gray-700 flex items-center gap-3 animate-slideIn max-w-sm">
      <div className="w-8 h-8 rounded-full bg-[#ef4a23] flex items-center justify-center shrink-0">
        <Zap className="w-4 h-4 fill-white text-white" />
      </div>
      <p className="text-xs font-semibold leading-snug">{toastMessage}</p>
    </div>
  );
}
