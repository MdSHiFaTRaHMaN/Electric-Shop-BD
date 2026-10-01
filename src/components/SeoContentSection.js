"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, ShieldCheck, Award, Zap, Truck, Headphones } from "lucide-react";

export default function SeoContentSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
        
        {/* Value Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 mb-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-50 text-[#ef4a23] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">100% Genuine</h4>
              <p className="text-[11px] text-gray-400">Authentic Brand Products</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#3749bb] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">ISO 9001:2015</h4>
              <p className="text-[11px] text-gray-400">Quality Certified Store</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">64 Districts</h4>
              <p className="text-[11px] text-gray-400">Nationwide Fast Delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Expert Support</h4>
              <p className="text-[11px] text-gray-400">9 AM - 8 PM Helpline</p>
            </div>
          </div>
        </div>

        {/* Text Article */}
        <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-3">
          Leading Electric, Solar &amp; Tech Products Retail &amp; Online Shop in Bangladesh
        </h1>
        
        <div className={`text-xs sm:text-sm text-gray-600 space-y-3 leading-relaxed ${!isExpanded ? "line-clamp-4" : ""}`}>
          <p>
            Electrical infrastructure and technology have become fundamental elements of modern living in Bangladesh. Whether lighting your home with fire-retardant copper wiring, ensuring non-stop productivity with an intelligent Pure Sine Wave IPS, or securing your office with smart biometric access control, quality electrical equipment protects life and property. This is where <strong>Electric BD Ltd.</strong> stands out.
          </p>
          <p>
            Established with the core belief that <strong>&ldquo;Customer Safety and Satisfaction Comes First,&rdquo;</strong> Electric BD is now Bangladesh&apos;s most trusted destination for genuine electrical cables, switchgears, circuit breakers, solar inverters, and power tools. In recognition of our stringent quality inspection and authentic distribution management, Electric BD is proud to be certified with the prestigious <strong>ISO 9001:2015 Certification</strong>.
          </p>
          <p>
            <strong>Best Solar &amp; IPS Inverter Shop in Bangladesh:</strong> Electric BD is an authorized distributor of international leaders such as Luminous, Sukam, Rahimafrooz, Hamko, and Felicity Solar. From residential 900VA Pure Sine Wave IPS to heavy-duty 48V industrial lithium power stations, our electrical engineers help you choose the ideal system based on your power consumption and budget.
          </p>
          <p>
            <strong>Certified Fire Retardant Cables &amp; Circuit Breakers:</strong> Electrical fires are a major hazard in Bangladesh. We supply only 100% factory-tested 99.99% pure electrolytic copper cables from BRB Cable, BBS, Eastern, and Poly Cable, along with Schneider Electric, ABB, and Chint miniature circuit breakers (MCB, MCCB, and RCBO) to prevent short-circuit overloads and earth leakage disasters.
          </p>
          <p>
            <strong>Fast Delivery Across 64 Districts:</strong> Through our distribution hubs in Dhaka, Chattogram, Sylhet, Khulna, and Rajshahi, we guarantee express doorstep delivery with cash on delivery, 0% EMI payment facilities, and official warranty repair across Bangladesh.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-xs font-bold text-[#3749bb] hover:text-[#ef4a23] flex items-center gap-1 transition"
        >
          {isExpanded ? (
            <>Read Less <ChevronUp className="w-3.5 h-3.5" /></>
          ) : (
            <>Read More About Electric BD <ChevronDown className="w-3.5 h-3.5" /></>
          )}
        </button>

      </div>
    </section>
  );
}
