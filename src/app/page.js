"use client";

import React from "react";
import { ShopProvider } from "@/context/ShopContext";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import MarqueeBanner from "@/components/MarqueeBanner";
import QuickActionCards from "@/components/QuickActionCards";
import FeaturedCategories from "@/components/FeaturedCategories";
import StoreFinderBanner from "@/components/StoreFinderBanner";
import ProductGrid from "@/components/ProductGrid";
import SeoContentSection from "@/components/SeoContentSection";
import Footer from "@/components/Footer";

// Mobile Sticky Bottom Navigation
import MobileBottomNav from "@/components/MobileBottomNav";

// Interactive Modals and Drawers
import CartDrawer from "@/components/CartDrawer";
import QuickViewModal from "@/components/QuickViewModal";
import ElectricBuilderModal from "@/components/ElectricBuilderModal";
import CheckoutModal from "@/components/CheckoutModal";
import AuthModal from "@/components/AuthModal";
import StoreLocatorModal from "@/components/StoreLocatorModal";
import CalculatorModal from "@/components/CalculatorModal";
import FloatingActions from "@/components/FloatingActions";
import Toast from "@/components/Toast";

export default function HomePage() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#f2f4f8] selection:bg-[#ef4a23] selection:text-white pb-16 lg:pb-0">
        {/* Navigation & Header matching Star Tech */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Hero Carousel with 2 side banners (Screenshot 1) */}
          <HeroSlider />

          {/* Pill Marquee notice (Screenshot 1: placed directly below promo banners) */}
          <MarqueeBanner />

          {/* 4 Star Tech style quick action cards (Screenshot 1: 2x2 grid with red-orange circular icons) */}
          <QuickActionCards />

          {/* Featured Category circular grid */}
          <FeaturedCategories />

          {/* 25+ Physical Outlets Banner */}
          <StoreFinderBanner />

          {/* Featured Products with Category Tabs and Star Tech Badges */}
          <ProductGrid />

          {/* SEO and Company Info Section */}
          <SeoContentSection />
        </main>

        {/* Star Tech Footer with Hotlines, Branch info and Apps */}
        <Footer />

        {/* Floating Cart Button (Desktop only) and Scroll to Top */}
        <FloatingActions />

        {/* Sticky Mobile Bottom Navigation Bar for 95% mobile users (Screenshot 1) */}
        <MobileBottomNav />

        {/* Modals & Slide-over Drawers */}
        <CartDrawer />
        <QuickViewModal />
        <ElectricBuilderModal />
        <CheckoutModal />
        <AuthModal />
        <StoreLocatorModal />
        <CalculatorModal />
        <Toast />
      </div>
    </ShopProvider>
  );
}
