"use client";

import React, { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { X, ShoppingCart, Heart, ShieldCheck, CheckCircle2, Plus, Minus, Star, Zap } from "lucide-react";

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart, toggleWishlist, wishlist } = useShop();
  const [qty, setQty] = useState(1);

  if (!quickViewProduct) return null;

  const isWishlisted = wishlist.includes(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, qty);
    closeQuickView();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <span>{quickViewProduct.categoryName}</span>
            <span>&bull;</span>
            <span className="text-[#ef4a23]">{quickViewProduct.brand}</span>
            <span>&bull;</span>
            <span>Product Code: <strong>{quickViewProduct.code}</strong></span>
          </div>
          <button
            type="button"
            onClick={closeQuickView}
            className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left: Product Image */}
          <div className="flex flex-col items-center">
            <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-gray-50 border border-gray-200 flex items-center justify-center p-4">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Guarantee badges */}
            <div className="w-full mt-4 grid grid-cols-2 gap-2 text-center text-[11px] text-gray-600">
              <div className="bg-gray-50 p-2 rounded-lg border border-gray-200 flex items-center justify-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                100% Genuine
              </div>
              <div className="bg-gray-50 p-2 rounded-lg border border-gray-200 flex items-center justify-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                {quickViewProduct.warranty}
              </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {quickViewProduct.badge && (
                  <span className="text-xs font-extrabold text-[#ef4a23] bg-[#ef4a23]/10 px-2 py-0.5 rounded">
                    {quickViewProduct.badge}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> In Stock
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-gray-900 leading-snug">
                {quickViewProduct.name}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-black text-[#ef4a23]">
                  {quickViewProduct.price.toLocaleString("en-BD")}৳
                </span>
                {quickViewProduct.oldPrice && (
                  <span className="text-sm line-through text-gray-400">
                    {quickViewProduct.oldPrice.toLocaleString("en-BD")}৳
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Key Specs Table */}
              <div className="mt-4">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                  Key Specifications
                </h4>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 divide-y divide-gray-200 text-xs">
                  {Object.entries(quickViewProduct.specs || {}).map(([key, val], idx) => (
                    <div key={idx} className="py-1.5 flex justify-between">
                      <span className="text-gray-500 font-medium">{key}</span>
                      <span className="text-gray-900 font-bold text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-bold text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                  <button
                    type="button"
                    onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                    className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 font-bold"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-sm font-bold text-gray-900">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((prev) => prev + 1)}
                    className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="bg-[#ef4a23] hover:bg-[#d43b17] text-white text-xs sm:text-sm font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`border border-gray-300 text-xs sm:text-sm font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition ${
                    isWishlisted
                      ? "bg-red-50 text-red-600 border-red-200"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-600 text-red-600" : ""}`} />
                  {isWishlisted ? "Wishlisted" : "Save Wishlist"}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
