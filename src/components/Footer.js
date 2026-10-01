"use client";

import React from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { Phone, MapPin, Mail, Zap, MessageCircle, Smartphone } from "lucide-react";

export default function Footer() {
  const { setIsStoreLocatorOpen, showToast } = useShop();

  const handleLinkClick = (e, name) => {
    e.preventDefault();
    showToast(`Navigating to ${name}`);
  };

  return (
    <footer className="bg-[#081621] text-white pt-12 pb-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-gray-800">
          
          {/* Column 1: Support & Hotlines (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Support
            </h4>

            {/* Helpline Big Button (Star Tech signature) */}
            <a
              href="tel:16793"
              className="flex items-center gap-4 p-3.5 rounded-xl border border-gray-700 bg-white/5 hover:bg-white/10 hover:border-[#ef4a23] transition group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#ef4a23] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5 fill-white" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400">9 AM - 8 PM (7 Days)</p>
                <h5 className="text-xl font-black text-white group-hover:text-[#ef4a23] transition-colors leading-none mt-0.5">
                  16793
                </h5>
              </div>
            </a>

            {/* Store Locator Big Button */}
            <button
              type="button"
              onClick={() => setIsStoreLocatorOpen(true)}
              className="w-full flex items-center gap-4 p-3.5 rounded-xl border border-gray-700 bg-white/5 hover:bg-white/10 hover:border-[#3749bb] transition group text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-[#3749bb] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400">25+ Showrooms in BD</p>
                <h5 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors leading-none mt-0.5">
                  Find Our Stores
                </h5>
              </div>
            </button>
          </div>

          {/* Column 2: About Us Links (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">
              About Us
            </h4>
            <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-400">
              {[
                "EMI Terms",
                "About Us",
                "Online Delivery",
                "Privacy Policy",
                "Warranty Policy",
                "Terms and Conditions",
                "Refund and Return Policy",
                "Electric Point Policy",
                "Career with Us",
                "Blog & News",
                "Contact Us",
                "Authorized Brands"
              ].map((link, idx) => (
                <a
                  key={idx}
                  href="#"
                  onClick={(e) => handleLinkClick(e, link)}
                  className="hover:text-[#ef4a23] transition-colors py-0.5"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Organization & Head Office (4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Stay Connected
            </h4>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#ef4a23] flex items-center justify-center text-white">
                <Zap className="w-5 h-5 fill-white" />
              </div>
              <span className="font-black text-lg text-white tracking-tight">ELECTRIC BD LTD.</span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              <strong>Head Office:</strong> 28 Kazi Nazrul Islam Avenue, Navana Zohura Square, Dhaka 1000, Bangladesh.
            </p>

            <p className="text-xs text-gray-400">
              <strong>Email:</strong>{" "}
              <a href="mailto:care@electricbd.com" className="text-gray-300 hover:text-[#ef4a23] underline">
                care@electricbd.com
              </a>
            </p>

            {/* Social Icons (SVG) */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#1877f2] flex items-center justify-center text-gray-300 hover:text-white transition"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#ff0000] flex items-center justify-center text-gray-300 hover:text-white transition"
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#e4405f] flex items-center justify-center text-gray-300 hover:text-white transition"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#25d366] flex items-center justify-center text-gray-300 hover:text-white transition"
                title="WhatsApp Channel"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Mobile App & Security Strip */}
        <div className="py-6 border-b border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-[#ef4a23]" />
            <span>Experience Electric BD App on your mobile:</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => handleLinkClick(e, "Google Play Store")}
              className="px-3.5 py-1.5 rounded-lg border border-gray-700 bg-white/5 hover:bg-white/10 text-white font-medium flex items-center gap-2 transition"
            >
              <span className="text-[10px] text-gray-400 block leading-none">GET IT ON</span>
              <span className="font-bold text-xs">Google Play</span>
            </a>
            <a
              href="#"
              onClick={(e) => handleLinkClick(e, "Apple App Store")}
              className="px-3.5 py-1.5 rounded-lg border border-gray-700 bg-white/5 hover:bg-white/10 text-white font-medium flex items-center gap-2 transition"
            >
              <span className="text-[10px] text-gray-400 block leading-none">Download on</span>
              <span className="font-bold text-xs">App Store</span>
            </a>
          </div>
        </div>

        {/* Copyright and Rights */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 text-center sm:text-left">
          <p>© 2026 Electric BD Ltd | All rights reserved</p>
          <p className="flex items-center gap-1 justify-center">
            Designed &amp; Powered By: <strong className="text-gray-300">Electric BD (Leading Tech &amp; Electrical Shop)</strong>
          </p>
        </div>

      </div>
    </footer>
  );
}
