"use client";

import React, { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { stores } from "@/data/stores";
import { X, MapPin, Phone, Clock, Mail, CheckCircle2, Search } from "lucide-react";

export default function StoreLocatorModal() {
  const { isStoreLocatorOpen, setIsStoreLocatorOpen } = useShop();
  const [selectedCity, setSelectedCity] = useState("All");

  if (!isStoreLocatorOpen) return null;

  const cities = ["All", ...new Set(stores.map((s) => s.city))];

  const filteredStores = selectedCity === "All"
    ? stores
    : stores.filter((s) => s.city === selectedCity);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#081621] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-5 h-5 text-[#ef4a23]" />
            <div>
              <h3 className="font-bold text-base sm:text-lg tracking-tight">
                Electric BD Store Locator &amp; Service Centers
              </h3>
              <p className="text-xs text-gray-400">
                25+ Physical Outlets Across Bangladesh
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsStoreLocatorOpen(false)}
            className="p-1 rounded-md text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* City Filter Tabs */}
        <div className="p-3 bg-gray-50 border-b flex gap-2 overflow-x-auto">
          {cities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                selectedCity === city
                  ? "bg-[#ef4a23] text-white"
                  : "bg-white text-gray-700 border hover:bg-gray-100"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Stores List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs hover:border-[#ef4a23] transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-50 text-[#3749bb]">
                    {store.city} Branch
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Open Today
                  </span>
                </div>

                <h4 className="text-sm font-bold text-gray-900 leading-snug mb-2">
                  {store.name}
                </h4>

                <p className="text-xs text-gray-600 flex items-start gap-1.5 mb-2 leading-relaxed">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  {store.address}
                </p>

                <p className="text-xs text-gray-600 flex items-center gap-1.5 mb-2">
                  <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                  {store.hours}
                </p>

                <p className="text-xs text-gray-600 flex items-center gap-1.5 mb-3">
                  <Phone className="w-4 h-4 text-[#ef4a23] shrink-0" />
                  <span className="font-bold text-gray-800">{store.mobile}</span> (Hotline: {store.phone})
                </p>

                {/* Features tags */}
                <div className="flex flex-wrap gap-1.5">
                  {store.features.map((feat, idx) => (
                    <span key={idx} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t flex gap-2">
                <a
                  href={`tel:${store.mobile}`}
                  className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold text-center transition flex items-center justify-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Store
                </a>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 bg-[#081621] hover:bg-[#ef4a23] text-white rounded-lg text-xs font-bold text-center transition flex items-center justify-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5" /> View on Map
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
