"use client";

import React, { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { builderComponents } from "@/data/products";
import {
  X,
  Zap,
  BatteryCharging,
  Sun,
  ShieldCheck,
  Cable,
  ShieldAlert,
  ShoppingCart,
  Printer,
  RotateCcw,
  CheckCircle2
} from "lucide-react";

export default function ElectricBuilderModal() {
  const { isElectricBuilderOpen, setIsElectricBuilderOpen, addToCart, showToast } = useShop();

  const [setup, setSetup] = useState({
    inverter: builderComponents.inverter[0],
    battery: builderComponents.battery[0],
    solarPanel: builderComponents.solarPanel[0],
    breaker: builderComponents.breaker[0],
    cables: builderComponents.cables[0],
    surgeProtection: builderComponents.surgeProtection[0]
  });

  if (!isElectricBuilderOpen) return null;

  const totalPrice = Object.values(setup).reduce((acc, curr) => acc + (curr?.price || 0), 0);
  const totalWattage = (setup.inverter?.wattage || 0);

  const handleSelectComponent = (category, item) => {
    setSetup((prev) => ({ ...prev, [category]: item }));
  };

  const handleAddAllToCart = () => {
    Object.values(setup).forEach((comp) => {
      if (comp && comp.price > 0) {
        addToCart({
          id: comp.id,
          name: comp.name,
          price: comp.price,
          brand: comp.brand,
          categoryName: "Custom Electric Build",
          image: "https://images.unsplash.com/photo-1590959651367-69ab9c18d6a6?w=600&auto=format&fit=crop&q=80",
          warranty: "Official Warranty"
        });
      }
    });
    showToast("Entire Custom Electric Setup added to Cart!");
    setIsElectricBuilderOpen(false);
  };

  const handleReset = () => {
    setSetup({
      inverter: builderComponents.inverter[0],
      battery: builderComponents.battery[0],
      solarPanel: builderComponents.solarPanel[0],
      breaker: builderComponents.breaker[0],
      cables: builderComponents.cables[0],
      surgeProtection: builderComponents.surgeProtection[0]
    });
    showToast("System configuration reset");
  };

  const slots = [
    { key: "inverter", label: "Inverter / IPS Unit", icon: Zap, list: builderComponents.inverter },
    { key: "battery", label: "Battery Bank (Deep Cycle / Lithium)", icon: BatteryCharging, list: builderComponents.battery },
    { key: "solarPanel", label: "Solar PV Panels", icon: Sun, list: builderComponents.solarPanel },
    { key: "breaker", label: "Circuit Breaker / Switchgear", icon: ShieldAlert, list: builderComponents.breaker },
    { key: "cables", label: "Building / Solar Copper Cable", icon: Cable, list: builderComponents.cables },
    { key: "surgeProtection", label: "Surge Protection Device (SPD)", icon: ShieldCheck, list: builderComponents.surgeProtection }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#081621] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#ef4a23] flex items-center justify-center text-white">
              <Zap className="w-6 h-6 fill-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight">
                Electric &amp; Solar Setup Builder
              </h2>
              <p className="text-xs text-gray-400">
                Star Tech-style custom configuration with live wattage and backup estimate
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsElectricBuilderOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Configuration summary bar */}
        <div className="bg-gray-100 p-4 border-b border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-white p-2.5 rounded-lg shadow-2xs">
            <span className="text-[10px] text-gray-500 font-bold uppercase block">Max Load Power</span>
            <span className="text-sm sm:text-base font-black text-[#3749bb]">{totalWattage} Watts</span>
          </div>
          <div className="bg-white p-2.5 rounded-lg shadow-2xs">
            <span className="text-[10px] text-gray-500 font-bold uppercase block">Est. Backup Time</span>
            <span className="text-sm sm:text-base font-black text-emerald-600">4 - 6 Hours</span>
          </div>
          <div className="bg-white p-2.5 rounded-lg shadow-2xs">
            <span className="text-[10px] text-gray-500 font-bold uppercase block">Selected Parts</span>
            <span className="text-sm sm:text-base font-black text-gray-800">
              {Object.values(setup).filter((v) => v && v.price > 0).length} Items
            </span>
          </div>
          <div className="bg-white p-2.5 rounded-lg shadow-2xs border border-orange-200">
            <span className="text-[10px] text-[#ef4a23] font-bold uppercase block">Total Estimation</span>
            <span className="text-base sm:text-lg font-black text-[#ef4a23]">
              {totalPrice.toLocaleString("en-BD")}৳
            </span>
          </div>
        </div>

        {/* Component Slots */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {slots.map((slot) => {
            const Icon = slot.icon;
            const currentItem = setup[slot.key];

            return (
              <div
                key={slot.key}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-gray-700 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#ef4a23]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                      {slot.label}
                    </span>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">
                      {currentItem ? currentItem.name : "Not Selected"}
                    </p>
                    {currentItem?.price > 0 && (
                      <span className="text-xs font-semibold text-[#ef4a23]">
                        {currentItem.price.toLocaleString("en-BD")}৳
                      </span>
                    )}
                  </div>
                </div>

                {/* Dropdown Selector */}
                <div className="sm:w-64">
                  <select
                    value={currentItem?.id || ""}
                    onChange={(e) => {
                      const selected = slot.list.find((x) => x.id === e.target.value);
                      handleSelectComponent(slot.key, selected);
                    }}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ef4a23] cursor-pointer"
                  >
                    {slot.list.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} - {item.price === 0 ? "None" : `${item.price.toLocaleString("en-BD")}৳`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-white border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-bold text-gray-500 hover:text-gray-800 flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Setup
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                window.print();
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              Print Quotation
            </button>
            <button
              type="button"
              onClick={handleAddAllToCart}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-[#ef4a23] hover:bg-[#d43b17] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md"
            >
              <ShoppingCart className="w-4 h-4" />
              Add All to Cart ({totalPrice.toLocaleString("en-BD")}৳)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
