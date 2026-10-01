"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Zap, ArrowRight, ShieldCheck, Truck, Clock } from "lucide-react";
import { useShop } from "@/context/ShopContext";

const slides = [
  {
    id: 1,
    theme: "purple",
    topBadge: "১০ PM ⚡ ৮ AM",
    titleBengali: "রাত জুড়ে, খুশির অফার",
    bigOffer: "৩০,০০০৳ পর্যন্ত মূল্যছাড়",
    cashback: "১,০০০৳ ক্যাশব্যাক",
    subtext: "অনলাইন অর্ডার • বিকাশ পেমেন্ট • হোম ডেলিভারি",
    cta: "অফার দেখুন",
    tag: "Solar & IPS",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1200&auto=format&fit=crop&q=80",
    gradient: "from-[#2e0854] via-[#4a157d] to-[#1e053a]"
  },
  {
    id: 2,
    theme: "blue",
    topBadge: "24/7 POWER BACKUP",
    titleBengali: "সোলার আইপিএস ও ব্যাটারি সলিউশন",
    bigOffer: "২৫% ইনস্ট্যান্ট ডিসকাউন্ট",
    cashback: "ফ্রি ইনস্টলেশন সাপোর্ট",
    subtext: "লুমিনাস ও সুকাম পিওর সাইন ওয়েভ ইনভার্টার",
    cta: "সোলার আইপিএস কিনুন",
    tag: "Solar & IPS",
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=1200&auto=format&fit=crop&q=80",
    gradient: "from-[#081e3d] via-[#0d346b] to-[#041124]"
  },
  {
    id: 3,
    theme: "emerald",
    topBadge: "100% FACTORY AUTHENTIC",
    titleBengali: "আসল বিআরবি ও বিবিএস ক্যাবলস",
    bigOffer: "৯৯.৯৯% কপার গ্যারান্টি",
    cashback: "ক্যাশ অন ডেলিভারি",
    subtext: "স্নাইডার ও এবিবি সার্কিট ব্রেকার্স ও সুইচগিয়ার",
    cta: "ক্যাবলস এক্সপ্লোর করুন",
    tag: "Cables & Wire",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop&q=80",
    gradient: "from-[#06241b] via-[#0d4534] to-[#03140f]"
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setSearchQuery, showToast, setIsElectricBuilderOpen } = useShop();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleComplainClick = () => {
    showToast("আপনার অভিযোগ বা পরামর্শের জন্য কল করুন: 16793");
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-4">
        
        {/* Main Banner Slider (9 Cols on desktop, full on mobile - Screenshot 1) */}
        <div className="lg:col-span-9 relative rounded-2xl overflow-hidden shadow-sm bg-gray-900 h-[210px] sm:h-[320px] md:h-[380px] group">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === currentSlide ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Background with custom rich gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />

              {/* Background Art Image with subtle blend */}
              <img
                src={slide.image}
                alt={slide.titleBengali}
                className="absolute right-0 top-0 w-3/5 sm:w-1/2 h-full object-cover object-center opacity-30 mix-blend-overlay"
              />

              {/* Banner Content Layout matching Screenshot 1 */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-8 text-white z-20">
                
                {/* Top Offer Badge & 3D Clock Motif */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-400 text-gray-950 text-[10px] sm:text-xs font-black uppercase px-2.5 py-0.5 sm:py-1 rounded-full shadow flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {slide.topBadge}
                    </span>
                  </div>

                  <span className="text-[10px] sm:text-xs font-bold text-gray-300 bg-white/10 px-2 py-0.5 rounded-full">
                    STAR TECH SPECIAL
                  </span>
                </div>

                {/* Main Offer Titles */}
                <div className="my-auto">
                  <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-amber-300 tracking-tight drop-shadow-sm leading-tight">
                    {slide.bigOffer}
                  </h2>
                  <p className="text-sm sm:text-2xl font-black text-white mt-0.5 flex items-center gap-2">
                    <span>{slide.cashback}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-gray-200 mt-1 font-medium">
                    {slide.titleBengali} &bull; {slide.subtext}
                  </p>
                </div>

                {/* Bottom CTA Button */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery(slide.tag);
                      showToast(`Browsing ${slide.tag}`);
                    }}
                    className="bg-[#ef4a23] hover:bg-[#d43b17] active:scale-95 text-white text-xs sm:text-sm font-bold px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5"
                  >
                    <span>{slide.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsElectricBuilderOpen(true)}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white text-xs sm:text-sm font-bold px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-white/30 transition flex items-center gap-1"
                  >
                    <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>Setup Builder</span>
                  </button>
                </div>

              </div>

            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-xs active:scale-95 transition"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-xs active:scale-95 transition"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Screenshot 1 Signature Dots Indicator with Active Orange Pill */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all rounded-full ${
                  idx === currentSlide
                    ? "w-7 h-2 bg-[#ef4a23]"
                    : "w-2 h-2 bg-white/60 hover:bg-white"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 2 Side Promo Banners (Screenshot 1: 2 columns on mobile, stacked on desktop) */}
        <div className="lg:col-span-3 grid grid-cols-2 lg:flex lg:flex-col gap-2.5 sm:gap-4">
          
          {/* Banner 1 (Left in Screenshot 1): Customer Feedback & Complain */}
          <div
            onClick={handleComplainClick}
            className="relative bg-gradient-to-br from-[#075985] via-[#0284c7] to-[#0369a1] rounded-2xl p-3.5 sm:p-5 text-white flex flex-col justify-between overflow-hidden shadow-2xs cursor-pointer group hover:scale-[1.01] active:scale-98 transition min-h-[140px] sm:min-h-[160px]"
          >
            {/* Sparkle star decorations */}
            <div className="absolute top-2 right-2 text-cyan-200/40 text-sm select-none">✦</div>
            <div className="absolute bottom-4 left-3 text-cyan-200/30 text-xs select-none">✦</div>
            <div className="absolute top-1/2 right-1/4 text-cyan-200/20 text-xs select-none">✦</div>

            <div className="relative z-10">
              <p className="text-[11px] sm:text-xs text-sky-100 font-medium leading-tight">
                স্টার টেক নিয়ে আপনার
              </p>
              <h3 className="text-sm sm:text-lg font-black text-white mt-1 leading-tight">
                অভিযোগ বা<br />মতামত
              </h3>
            </div>

            {/* Orange Pill Button with Mouse Cursor (Screenshot 1) */}
            <div className="relative z-10 mt-3 flex items-center">
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-[#ef4a23] to-[#f97316] text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow-md group-hover:brightness-110 transition">
                <span>জানান এখানে</span>
                {/* Hand pointer cursor icon */}
                <svg className="w-3.5 h-3.5 fill-white text-white shrink-0 ml-0.5" viewBox="0 0 24 24">
                  <path d="M9 3a2 2 0 0 1 2 2v6.5l1.3-.9a2 2 0 0 1 2.7.3l1.8 2.2a2 2 0 0 1 .4 1.3v3.6c0 2.8-2.2 5-5 5H11a5 5 0 0 1-4.9-4.1l-1.3-6.2a1.8 1.8 0 0 1 3-1.6L9 12.2V5a2 2 0 0 1 2-2z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Banner 2 (Right in Screenshot 1): Shape Your Career With Us */}
          <div
            onClick={() => showToast("Career opportunities: Send CV to career@electricbd.com")}
            className="relative bg-gradient-to-br from-[#7c2d12] via-[#9a3412] to-[#431407] rounded-2xl p-3.5 sm:p-5 text-white flex flex-col justify-between overflow-hidden shadow-2xs cursor-pointer group hover:scale-[1.01] active:scale-98 transition min-h-[140px] sm:min-h-[160px]"
          >
            {/* Ambient decorative curve */}
            <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-orange-500/20 pointer-events-none" />

            <div className="flex justify-end">
              <span className="text-[8.5px] sm:text-[9.5px] font-black tracking-widest text-orange-200 bg-white/10 px-2 py-0.5 rounded-full uppercase">
                APPLY NOW
              </span>
            </div>

            <div className="relative z-10 mt-1 sm:mt-2">
              <h3 className="text-sm sm:text-lg font-black text-white leading-tight">
                Shape
              </h3>
              <div className="inline-block bg-amber-400 text-gray-950 font-black text-xs sm:text-sm px-2 py-0.5 rounded-md my-0.5 shadow">
                Your Career
              </div>
              <h3 className="text-sm sm:text-lg font-black text-white leading-tight">
                With Us!
              </h3>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
