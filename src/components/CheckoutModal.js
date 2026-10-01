"use client";

import React, { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { X, CheckCircle, Truck, CreditCard, ShieldCheck, MapPin, Phone, User, CheckCircle2 } from "lucide-react";

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartTotalPrice, clearCart, showToast } = useShop();

  const [formData, setFormData] = useState({
    name: "Mohammad Sifat",
    phone: "01711223344",
    email: "sifat@example.com",
    address: "House 24, Road 5, Dhanmondi",
    city: "Dhaka",
    deliveryType: "express",
    paymentMethod: "cod",
    notes: ""
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");

  if (!isCheckoutOpen) return null;

  const deliveryFee = formData.deliveryType === "pickup" ? 0 : cartTotalPrice >= 10000 ? 0 : 120;
  const grandTotal = cartTotalPrice + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrderId = "EBD-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newOrderId);
    setOrderConfirmed(true);
    clearCart();
    showToast(`Order #${newOrderId} placed successfully!`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#081621] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-[#ef4a23]" />
            <h3 className="font-bold text-base sm:text-lg tracking-tight">
              {orderConfirmed ? "Order Confirmation" : "Complete Your Order"}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsCheckoutOpen(false);
              setOrderConfirmed(false);
            }}
            className="p-1 rounded-md text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {orderConfirmed ? (
          /* Confirmation Receipt View */
          <div className="p-6 sm:p-8 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Thank You For Your Order!</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-md">
              Your order has been received and is being prepared by our central warehouse team.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 my-5 w-full max-w-md text-left text-xs space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Order ID:</span>
                <span className="font-mono font-bold text-gray-900">{orderId}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Recipient:</span>
                <span className="font-bold text-gray-900">{formData.name} ({formData.phone})</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Delivery Address:</span>
                <span className="font-bold text-gray-900">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Payment:</span>
                <span className="font-bold uppercase text-[#ef4a23]">{formData.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-black text-gray-900">
                <span>Total Amount:</span>
                <span className="text-[#ef4a23]">{grandTotal.toLocaleString("en-BD")}৳</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mb-6">
              Our representative will call you shortly on <strong>{formData.phone}</strong> for delivery verification.
            </p>

            <button
              type="button"
              onClick={() => {
                setIsCheckoutOpen(false);
                setOrderConfirmed(false);
              }}
              className="px-6 py-2.5 bg-[#ef4a23] text-white text-xs font-bold rounded-lg shadow hover:bg-[#d43b17] transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Checkout Form View */
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            
            {/* Customer Details */}
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#ef4a23]" /> 1. Customer Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#ef4a23] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#ef4a23] focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-gray-600 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#ef4a23] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="pt-3 border-t">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#ef4a23]" /> 2. Delivery Address
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-600 block mb-1">City / Division *</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#ef4a23] focus:outline-none"
                  >
                    <option value="Dhaka">Dhaka (Inside City)</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Other">Other Districts</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Delivery Method</label>
                  <select
                    value={formData.deliveryType}
                    onChange={(e) => setFormData({ ...formData, deliveryType: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#ef4a23] focus:outline-none"
                  >
                    <option value="express">Express Delivery (24-48 Hours)</option>
                    <option value="pickup">Showroom Pickup (Elephant Road)</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-gray-600 block mb-1">Full Street Address *</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#ef4a23] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="pt-3 border-t">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-[#ef4a23]" /> 3. Payment Method
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "cod", label: "Cash on Delivery", desc: "Pay after inspect" },
                  { id: "bkash", label: "bKash / Nagad", desc: "Instant MFS" },
                  { id: "card", label: "Credit / Debit Card", desc: "Visa / Master" },
                  { id: "emi", label: "0% EMI Facility", desc: "Up to 12 Months" }
                ].map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setFormData({ ...formData, paymentMethod: m.id })}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition ${
                      formData.paymentMethod === m.id
                        ? "border-[#ef4a23] bg-orange-50/50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={formData.paymentMethod === m.id}
                      onChange={() => {}}
                      className="accent-[#ef4a23]"
                    />
                    <p className="text-xs font-bold text-gray-900 mt-1">{m.label}</p>
                    <p className="text-[10px] text-gray-500">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total & Submit */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Total Items ({cart.length})</span>
                <span className="font-bold">{cartTotalPrice.toLocaleString("en-BD")}৳</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mb-2">
                <span>Shipping Charge</span>
                <span className="font-bold text-emerald-600">{deliveryFee === 0 ? "FREE" : `${deliveryFee}৳`}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-sm sm:text-base font-black text-gray-900">
                <span>Total Payable</span>
                <span className="text-[#ef4a23]">{grandTotal.toLocaleString("en-BD")}৳</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#ef4a23] hover:bg-[#d43b17] text-white font-bold py-3 rounded-lg text-sm transition shadow-md hover:shadow-lg"
            >
              Confirm &amp; Place Order ({grandTotal.toLocaleString("en-BD")}৳)
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
