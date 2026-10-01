"use client";

import React from "react";
import { featuredCategories } from "@/data/categories";
import { useShop } from "@/context/ShopContext";
import {
  Sun,
  Cable,
  ShieldAlert,
  Wind,
  Wrench,
  Home,
  Camera,
  ToggleRight,
  Fan,
  BatteryCharging,
  Lock,
  Zap
} from "lucide-react";

const iconMap = {
  Sun,
  Cable,
  ShieldAlert,
  Wind,
  Wrench,
  Home,
  Camera,
  ToggleRight,
  Fan,
  BatteryCharging,
  Lock,
  Zap
};

export default function FeaturedCategories() {
  const { setSearchQuery, showToast } = useShop();

  const handleCategorySelect = (slug, name) => {
    setSearchQuery(name);
    const elem = document.getElementById("featured-products");
    elem?.scrollIntoView({ behavior: "smooth" });
    showToast(`Showing ${name} products`);
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-2xl font-black text-gray-900 tracking-tight">
          Featured Category
        </h2>
        <p className="text-[11px] sm:text-sm text-gray-500 mt-0.5">
          Get Your Desired Product from Our Popular Categories
        </p>
      </div>

      {/* 3 columns on mobile, 4 on tablet, 6 on desktop */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3.5">
        {featuredCategories.map((cat) => {
          const IconComponent = iconMap[cat.icon] || Zap;
          return (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.slug, cat.name)}
              className="bg-white p-2.5 sm:p-4 rounded-2xl shadow-2xs hover:shadow-md border border-gray-100 flex flex-col items-center text-center cursor-pointer transition-all active:scale-95 group"
            >
              <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white mb-1.5 sm:mb-2.5 shadow-xs group-hover:scale-110 transition-transform`}>
                <IconComponent className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-[11px] sm:text-sm font-bold text-gray-800 group-hover:text-[#ef4a23] transition-colors leading-tight line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-[9px] sm:text-[11px] text-gray-400 font-medium mt-0.5 hidden sm:block">
                {cat.count}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
