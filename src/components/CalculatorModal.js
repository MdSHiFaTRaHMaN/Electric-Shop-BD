"use client";

import React, { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { X, Calculator, Zap, BatteryCharging, ArrowRight, CheckCircle2 } from "lucide-react";

export default function CalculatorModal() {
  const { isCalculatorOpen, setIsCalculatorOpen, setSearchQuery, showToast } = useShop();

  const [appliances, setAppliances] = useState({
    fans: 3,
    lights: 6,
    tv: 1,
    fridge: 0,
    router: 1,
    computer: 1
  });

  if (!isCalculatorOpen) return null;

  // Wattage calculation
  const totalWatts =
    appliances.fans * 75 +
    appliances.lights * 15 +
    appliances.tv * 100 +
    appliances.fridge * 250 +
    appliances.router * 15 +
    appliances.computer * 150;

  // Sizing recommendations
  const recommendedVA = Math.ceil((totalWatts * 1.25) / 100) * 100;
  const recommendedInverter =
    recommendedVA <= 900
      ? "Luminous Zelio+ 1100VA (900W Pure Sine Wave)"
      : recommendedVA <= 1600
      ? "Sukam Falcon Eco 1600VA Smart Hybrid"
      : "Microtek 3.5KVA Heavy Duty Commercial Inverter";

  const recommendedBattery =
    totalWatts <= 300
      ? "1x 12V 150Ah Tubular Battery"
      : totalWatts <= 600
      ? "1x 12V 200Ah Deep Cycle Battery"
      : "2x 12V 200Ah (24V System) or 48V Lithium Bank";

  const estBackupHours = totalWatts > 0 ? (Math.round((2400 * 0.8) / totalWatts * 10) / 10) : 0;

  const handleApplyRecommendation = () => {
    setSearchQuery("inverter");
    setIsCalculatorOpen(false);
    showToast(`Showing Inverters suitable for ${totalWatts}W load`);
    const elem = document.getElementById("featured-products");
    elem?.scrollIntoView({ behavior: "smooth" });
  };

  const updateCount = (key, delta) => {
    setAppliances((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#081621] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calculator className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-base sm:text-lg tracking-tight">
                Home Electric Load &amp; Solar IPS Calculator
              </h3>
              <p className="text-xs text-gray-400">
                Calculate total power requirements and get perfect Inverter &amp; Battery sizing
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsCalculatorOpen(false)}
            className="p-1 rounded-md text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* Appliance input counters */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              1. Select appliances running during power outage:
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: "fans", label: "Ceiling Fans (75W each)", count: appliances.fans },
                { key: "lights", label: "LED Lights (15W each)", count: appliances.lights },
                { key: "tv", label: "LED Smart TV (100W)", count: appliances.tv },
                { key: "fridge", label: "Refrigerator (250W)", count: appliances.fridge },
                { key: "router", label: "WiFi Router & ONU (15W)", count: appliances.router },
                { key: "computer", label: "Desktop PC / Laptop (150W)", count: appliances.computer }
              ].map((item) => (
                <div
                  key={item.key}
                  className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between"
                >
                  <span className="text-xs font-semibold text-gray-800">{item.label}</span>
                  <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg">
                    <button
                      type="button"
                      onClick={() => updateCount(item.key, -1)}
                      className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-gray-900 px-1">{item.count}</span>
                    <button
                      type="button"
                      onClick={() => updateCount(item.key, 1)}
                      className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="bg-gradient-to-br from-[#081621] to-[#12283a] rounded-xl p-5 text-white shadow-md">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-b border-gray-700 pb-4 mb-4 text-center">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Total Load</span>
                <span className="text-xl sm:text-2xl font-black text-amber-400">{totalWatts} Watts</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Required Inverter</span>
                <span className="text-xl sm:text-2xl font-black text-cyan-400">{recommendedVA} VA</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Est. Backup Time</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400">~{estBackupHours} Hours</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-400">Recommended Inverter: </span>
                  <strong className="text-white">{recommendedInverter}</strong>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-400">Recommended Battery: </span>
                  <strong className="text-white">{recommendedBattery}</strong>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsCalculatorOpen(false)}
            className="px-4 py-2 border rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-100"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleApplyRecommendation}
            className="px-5 py-2 bg-[#ef4a23] hover:bg-[#d43b17] text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow"
          >
            <span>View Matching Inverters</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
