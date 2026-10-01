"use client";

import React from "react";

export default function MarqueeBanner() {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 my-2 sm:my-3">
      {/* Pill Capsule (Screenshot 1: rounded-full, clean white background, subtle shadow) */}
      <div className="bg-white rounded-full py-2 sm:py-2.5 px-4 sm:px-6 shadow-xs border border-gray-200/80 flex items-center overflow-hidden">
        <div className="whitespace-nowrap animate-marquee text-xs sm:text-sm font-medium text-gray-700">
          <span className="font-semibold text-gray-900">Thursday, 01 October,</span>
          <span className="mx-2">All our branches are open including IDB Bhaban, Multiplan Center, Uttara, Dhanmondi, Chattogram, Sylhet, Khulna &amp; Rajshahi.</span>
          <span className="mx-4 text-[#ef4a23] font-bold">⚡ Special Offers: Up to 35% Instant Discount on Solar Inverters, Switchgear &amp; Cables!</span>
          <span className="mx-4 text-emerald-600 font-bold">🚚 24-48 Hours Express Delivery Active Nationwide</span>
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
