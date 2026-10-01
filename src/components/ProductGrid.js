"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { useShop } from "@/context/ShopContext";
import { Filter, ArrowUpDown, Sparkles } from "lucide-react";

const filterTabs = [
  { label: "All Products", value: "all" },
  { label: "Solar & Inverters", value: "solar-ips" },
  { label: "Cables & Wiring", value: "cables-wiring" },
  { label: "Circuit Breakers", value: "circuit-breakers" },
  { label: "Power Tools", value: "power-tools" },
  { label: "Home Appliances", value: "appliances" },
  { label: "Smart Home & CCTV", value: "security" }
];

export default function ProductGrid() {
  const { products, searchQuery, setSearchQuery } = useShop();
  const [selectedTab, setSelectedTab] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Filtering
  let filtered = products.filter((p) => {
    const matchesTab = selectedTab === "all" || p.category === selectedTab;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Sorting
  if (sortBy === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "discount") {
    filtered.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
  } else if (sortBy === "popular") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <section id="featured-products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Featured Products
            </h2>
            <span className="bg-red-50 text-[#ef4a23] text-xs font-bold px-2.5 py-0.5 rounded-full">
              Original BD
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Check &amp; Get Your Desired Certified Electric &amp; Tech Products!
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-white border border-gray-200 px-3.5 py-1.5 rounded-xl shadow-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-semibold text-gray-700">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-medium text-gray-900 focus:outline-none cursor-pointer"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Biggest Discount</option>
              <option value="popular">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => {
              setSelectedTab(tab.value);
              if (searchQuery) setSearchQuery("");
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedTab === tab.value
                ? "bg-[#3749bb] text-white shadow-sm"
                : "bg-white text-gray-700 border border-gray-200 hover:border-gray-400 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Search Notification */}
      {searchQuery && (
        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-center justify-between text-xs text-orange-800">
          <span>
            Filtering by search: <strong>&quot;{searchQuery}&quot;</strong> ({filtered.length} products found)
          </span>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="text-[#ef4a23] font-bold hover:underline"
          >
            Clear Filter &times;
          </button>
        </div>
      )}

      {/* Product Grid - 2 columns on mobile */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
          <p className="text-gray-500 text-sm">
            No products found matching your current filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedTab("all");
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-2 bg-[#ef4a23] text-white text-xs font-bold rounded"
          >
            Reset Filters
          </button>
        </div>
      )}

    </section>
  );
}
