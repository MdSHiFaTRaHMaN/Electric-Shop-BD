"use client";

import React from "react";
import { ShoppingCart, Eye, Heart, CheckCircle2, Zap } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function ProductCard({ product }) {
  const { addToCart, openQuickView, toggleWishlist, wishlist } = useShop();
  const isWishlisted = wishlist.includes(product.id);

  // Take top 2 specs for mobile preview
  const specEntries = Object.entries(product.specs || {}).slice(0, 2);

  return (
    <div className="star-card bg-white rounded-2xl border border-gray-200/80 p-2.5 sm:p-4 flex flex-col justify-between relative group shadow-2xs hover:shadow-md transition-all">
      
      {/* Top Bar: Discount Badge & Wishlist */}
      <div className="flex items-center justify-between gap-1 mb-1.5 sm:mb-2">
        {product.badge ? (
          <span className="text-[9px] sm:text-[11px] font-bold text-[#ef4a23] bg-[#ef4a23]/10 px-2 py-0.5 rounded-full line-clamp-1">
            {product.badge}
          </span>
        ) : (
          <span className="text-[9px] sm:text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
            <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> In Stock
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className={`p-1 sm:p-1.5 rounded-full hover:bg-gray-100 transition ${
            isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500"
          }`}
          title="Save to Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? "fill-red-500" : ""}`} />
        </button>
      </div>

      {/* Product Image */}
      <div
        className="relative h-32 sm:h-48 w-full overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center cursor-pointer mb-2 sm:mb-3"
        onClick={() => openQuickView(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Hover Quick Action Button */}
        <div className="hidden sm:flex absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="p-2.5 bg-white rounded-full text-gray-800 hover:text-[#ef4a23] shadow-md transition"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5 sm:mb-1">
            {product.brand}
          </span>
          <h3
            onClick={() => openQuickView(product)}
            className="product-title text-xs sm:text-sm font-bold text-gray-800 hover:text-[#ef4a23] transition-colors line-clamp-2 cursor-pointer leading-tight sm:leading-snug mb-1.5 sm:mb-2"
          >
            {product.name}
          </h3>

          {/* Quick Specs Bullet Points (Responsive) */}
          <ul className="text-[10px] sm:text-[11px] text-gray-500 space-y-0.5 sm:space-y-1 mb-2 sm:mb-3 bg-gray-50/80 p-2 rounded-xl">
            {specEntries.map(([key, val], idx) => (
              <li key={idx} className="truncate">
                <span className="font-semibold text-gray-700">{key}:</span> {val}
              </li>
            ))}
          </ul>
        </div>

        {/* Price and Cart Button */}
        <div>
          <div className="pt-1.5 sm:pt-2 border-t border-gray-100 mb-2 sm:mb-3 flex items-baseline justify-between">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5">
              <span className="text-sm sm:text-lg font-black text-[#ef4a23]">
                {product.price.toLocaleString("en-BD")}৳
              </span>
              {product.oldPrice && (
                <span className="text-[10px] sm:text-xs line-through text-gray-400">
                  {product.oldPrice.toLocaleString("en-BD")}৳
                </span>
              )}
            </div>
            <span className="text-[9px] sm:text-[11px] text-gray-400 font-medium hidden sm:inline">
              {product.warranty.split(" ")[0]} {product.warranty.split(" ")[1]}
            </span>
          </div>

          {/* Touch-Friendly Action Buttons */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="w-full bg-[#ef4a23] hover:bg-[#d43b17] active:scale-95 text-white text-[11px] sm:text-xs font-bold py-2 sm:py-2.5 rounded-xl flex items-center justify-center gap-1 transition-all shadow-xs"
            >
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white" />
              <span>Buy</span>
            </button>
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="w-full bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-800 text-[11px] sm:text-xs font-bold py-2 sm:py-2.5 rounded-xl flex items-center justify-center gap-1 transition-all"
            >
              <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-600" />
              <span>+ Cart</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
