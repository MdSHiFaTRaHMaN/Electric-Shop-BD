"use client";

import React from "react";
import { Laptop, MessageSquare, Home, Settings } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function QuickActionCards() {
  const { setIsCalculatorOpen, setIsStoreLocatorOpen, showToast } = useShop();

  const handleFinderClick = () => {
    const elem = document.getElementById("featured-products");
    elem?.scrollIntoView({ behavior: "smooth" });
    showToast("Browse all electrical and tech products");
  };

  const handleComplainClick = () => {
    showToast("Hotline 16793 or email to care@electricbd.com");
  };

  const cards = [
    {
      id: "laptop-finder",
      title: "Laptop Finder",
      icon: Laptop,
      action: handleFinderClick
    },
    {
      id: "raise-complain",
      title: "Raise a Complain",
      icon: MessageSquare,
      action: handleComplainClick
    },
    {
      id: "ac-calculator",
      title: "AC Ton Calculator",
      icon: Home,
      action: () => setIsCalculatorOpen(true)
    },
    {
      id: "service-center",
      title: "Servicing Center",
      icon: Settings,
      action: () => setIsStoreLocatorOpen(true)
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3">
      {/* 2x2 grid on mobile, 4 columns on desktop (Screenshot 1) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={card.action}
              className="bg-white p-3.5 sm:p-4 rounded-2xl shadow-2xs hover:shadow-md border border-gray-100 flex items-center gap-3 sm:gap-3.5 cursor-pointer transition-all active:scale-97 group"
            >
              {/* Star Tech Red-Orange Circular Icon Badge (Screenshot 1) */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#ef4a23] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              {/* Card Title */}
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 group-hover:text-[#ef4a23] transition-colors leading-tight">
                  {card.title}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
