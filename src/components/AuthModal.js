"use client";

import React, { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { X, User, Lock, Mail, Phone, ArrowRight, ShieldCheck } from "lucide-react";

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, loginUser, showToast } = useShop();
  const [mode, setMode] = useState(authMode || "login");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: ""
  });

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = formData.name || formData.phone || formData.email.split("@")[0] || "Valued Customer";
    loginUser({
      name: displayName,
      phone: formData.phone || "01711223344",
      email: formData.email || "customer@electricbd.com"
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="p-5 bg-[#081621] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#ef4a23]" />
            <h3 className="font-bold text-base tracking-tight">
              {mode === "login" ? "Account Login" : "Register New Account"}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1 rounded-md text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="grid grid-cols-2 border-b text-center text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`py-3 transition-colors ${
              mode === "login"
                ? "border-b-2 border-[#ef4a23] text-[#ef4a23] bg-orange-50/40"
                : "text-gray-500 hover:text-gray-900 bg-gray-50"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`py-3 transition-colors ${
              mode === "register"
                ? "border-b-2 border-[#ef4a23] text-[#ef4a23] bg-orange-50/40"
                : "text-gray-500 hover:text-gray-900 bg-gray-50"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === "register" && (
            <div>
              <label className="text-xs text-gray-600 block mb-1">Full Name *</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Mohammad Sifat"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs pl-8 focus:ring-2 focus:ring-[#ef4a23] focus:outline-none"
                />
                <User className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs text-gray-600 block mb-1">Phone Number or Email *</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="01XXXXXXXXX or email@domain.com"
                value={formData.phone || formData.email}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value, email: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-xs pl-8 focus:ring-2 focus:ring-[#ef4a23] focus:outline-none"
              />
              <Phone className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-gray-600">Password *</label>
              {mode === "login" && (
                <button
                  type="button"
                  onClick={() => showToast("Password reset link sent to your registered phone")}
                  className="text-[11px] text-[#3749bb] hover:underline"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-xs pl-8 focus:ring-2 focus:ring-[#ef4a23] focus:outline-none"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#ef4a23] hover:bg-[#d43b17] text-white font-bold py-2.5 rounded-lg text-xs transition shadow-md mt-2 flex items-center justify-center gap-1.5"
          >
            <span>{mode === "login" ? "Login to Account" : "Create Account"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-3 border-t text-center text-xs text-gray-500">
            <span>By proceeding, you agree to Electric BD&apos;s </span>
            <a href="#" className="text-[#3749bb] underline">Terms &amp; Warranty Policy</a>.
          </div>
        </form>

      </div>
    </div>
  );
}
