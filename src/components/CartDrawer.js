"use client";

import React from "react";
import { useShop } from "@/context/ShopContext";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotalPrice,
    cartTotalCount,
    setIsCheckoutOpen
  } = useShop();

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 10000;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartTotalPrice);
  const deliveryPercent = Math.min(100, Math.round((cartTotalPrice / freeDeliveryThreshold) * 100));

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-4 bg-[#081621] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#ef4a23]" />
            <h3 className="font-bold text-base tracking-tight">YOUR CART ({cartTotalCount})</h3>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Free delivery incentive bar */}
        <div className="bg-orange-50 p-3 border-b border-orange-100 text-xs">
          {remainingForFreeDelivery === 0 ? (
            <p className="font-bold text-emerald-700 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> You unlocked Free Express Delivery!
            </p>
          ) : (
            <p className="text-gray-700">
              Add <strong className="text-[#ef4a23]">{remainingForFreeDelivery.toLocaleString("en-BD")}৳</strong> more to get <strong>FREE Delivery</strong>!
            </p>
          )}
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className="bg-[#ef4a23] h-full rounded-full transition-all duration-300"
              style={{ width: `${deliveryPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
          {cart.length > 0 ? (
            cart.map(({ product, quantity }) => (
              <div key={product.id} className="py-3 flex gap-3 items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md border border-gray-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-800 truncate leading-snug">
                    {product.name}
                  </h4>
                  <p className="text-xs font-bold text-[#ef4a23] mt-0.5">
                    {product.price.toLocaleString("en-BD")}৳
                  </p>
                  
                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-gray-200 rounded-md bg-gray-50">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(product.id, -1)}
                        className="p-1 hover:bg-gray-200 text-gray-600 transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-gray-800">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(product.id, 1)}
                        className="p-1 hover:bg-gray-200 text-gray-600 transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="text-gray-400 hover:text-red-500 p-1 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-gray-900 block">
                    {(product.price * quantity).toLocaleString("en-BD")}৳
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-300 mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-gray-700 text-sm">Your Cart is Empty</h4>
              <p className="text-xs text-gray-400 mt-1 max-w-xs">
                Explore our genuine electrical gear, circuit breakers, and inverters.
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-4 py-2 bg-[#ef4a23] text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-3">
            <div className="flex justify-between items-center text-xs text-gray-600">
              <span>Subtotal</span>
              <span className="font-bold text-gray-900">{cartTotalPrice.toLocaleString("en-BD")}৳</span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-600">
              <span>Estimated Delivery</span>
              <span className="font-bold text-emerald-600">
                {cartTotalPrice >= freeDeliveryThreshold ? "FREE" : "120৳"}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between items-center text-sm font-black text-gray-900">
              <span>Grand Total</span>
              <span className="text-base text-[#ef4a23]">
                {(cartTotalPrice + (cartTotalPrice >= freeDeliveryThreshold ? 0 : 120)).toLocaleString("en-BD")}৳
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="w-full bg-[#ef4a23] hover:bg-[#d43b17] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md hover:shadow-lg transition"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
      <div className="flex-1" onClick={() => setIsCartOpen(false)} />
    </div>
  );
}
