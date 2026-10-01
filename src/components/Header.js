"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { navigationCategories } from "@/data/categories";
import {
  Search,
  Gift,
  Zap,
  User,
  Menu,
  X,
  ChevronDown,
  Plus,
  Minus,
  Phone
} from "lucide-react";

export default function Header() {
  const {
    cartTotalCount,
    setIsCartOpen,
    openAuthModal,
    user,
    logoutUser,
    setIsElectricBuilderOpen,
    products,
    openQuickView,
    addToCart,
    showToast
  } = useShop();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCat, setExpandedCat] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // Filter products for live search preview
  const searchResults = searchQuery.trim() === ""
    ? []
    : products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        (searchRef.current && !searchRef.current.contains(event.target)) &&
        (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target))
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCategory = (idx) => {
    setExpandedCat(expandedCat === idx ? null : idx);
  };

  // Full category list matching Screenshot 2
  const drawerCategories = [
    { name: "Desktop", query: "Desktop" },
    { name: "Laptop", query: "Laptop" },
    { name: "Component", query: "Component" },
    { name: "Monitor", query: "Monitor" },
    { name: "Power & Inverter", query: "Solar & IPS" },
    { name: "Phone", query: "Phone" },
    { name: "Tablet", query: "Tablet" },
    { name: "Office Equipment", query: "Office" },
    { name: "Camera & CCTV", query: "Camera" },
    { name: "Security", query: "Security" },
    { name: "Networking", query: "Networking" },
    { name: "Software", query: "Software" },
    { name: "Server & Storage", query: "Storage" },
    { name: "Accessories", query: "Accessories" },
    { name: "Gadget", query: "Gadget" },
    { name: "Gaming", query: "Gaming" },
    { name: "TV & Appliances", query: "Air Conditioners" },
    { name: "Cables & Wiring", query: "Cables & Wire" },
    { name: "Circuit Breakers", query: "Circuit Breakers" },
    { name: "Power Tools", query: "Power Tools" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-xs">
      {/* Top Black / Deep Navy Header Bar (#081621 - matching Star Tech mobile & desktop) */}
      <div className="bg-[#081621] text-white py-2.5 sm:py-3 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            
            {/* Left: Mobile Menu Toggler (Screenshot 1 & 2) */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1 rounded-full text-white hover:bg-white/10 active:scale-95 transition"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? (
                  <div className="w-8 h-8 rounded-full border border-gray-500/80 flex items-center justify-center">
                    <X className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5 p-1">
                    <span className="w-6 h-0.5 bg-white rounded-full"></span>
                    <span className="w-6 h-0.5 bg-white rounded-full"></span>
                    <span className="w-6 h-0.5 bg-white rounded-full"></span>
                  </div>
                )}
              </button>
            </div>

            {/* Center: Brand Logo (Styled exactly like Star Tech's swoosh curve logo) */}
            <div className="flex items-center justify-center">
              <Link href="/" className="flex flex-col items-center group">
                <div className="relative flex items-center">
                  {/* Swoosh arch curve like Star Tech */}
                  <svg className="absolute -top-2.5 -left-2 w-32 sm:w-40 h-7 pointer-events-none text-cyan-400" viewBox="0 0 160 30" fill="none">
                    <path d="M5 24 C 30 2, 130 2, 155 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
                  </svg>
                  
                  {/* Brand Wordmark */}
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-[#ef4a23] flex items-center">
                    STAR<span className="text-cyan-400 ml-0.5">TECH</span>
                  </span>
                </div>
                <span className="text-[7.5px] sm:text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase -mt-0.5">
                  ELECTRIC &amp; IT SOLUTION
                </span>
              </Link>
            </div>

            {/* Desktop Central Search Bar */}
            <div className="hidden lg:block flex-1 max-w-xl mx-4 relative" ref={searchRef}>
              <div className="relative flex items-center bg-white rounded-xl shadow-xs overflow-hidden border border-gray-300">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search"
                  className="w-full text-gray-900 text-sm px-4 py-2.5 focus:outline-none placeholder-gray-500 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchFocused(true)}
                  className="pr-4 text-gray-800 hover:text-[#ef4a23] transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 text-gray-800" />
                </button>
              </div>

              {/* Autocomplete Dropdown (Desktop) */}
              {isSearchFocused && searchQuery.trim() !== "" && (
                <div className="absolute left-0 right-0 mt-2 bg-white text-gray-900 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                  <div className="p-2.5 bg-gray-50 border-b text-xs font-semibold text-gray-500 flex justify-between items-center">
                    <span>Products matching &quot;{searchQuery}&quot;</span>
                    <span>{searchResults.length} found</span>
                  </div>
                  {searchResults.length > 0 ? (
                    <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                      {searchResults.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 flex items-center gap-3 hover:bg-gray-50 transition cursor-pointer"
                          onClick={() => {
                            openQuickView(item);
                            setIsSearchFocused(false);
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-xl border border-gray-200"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate hover:text-[#ef4a23]">
                              {item.name}
                            </p>
                            <span className="text-sm font-bold text-[#ef4a23]">
                              {item.price.toLocaleString("en-BD")}৳
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-sm text-gray-500">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-5 text-left">
              <button
                type="button"
                onClick={() => {
                  const elem = document.getElementById("featured-products");
                  elem?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2.5 hover:text-[#ef4a23] transition-colors group text-left"
              >
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#ef4a23]">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white leading-tight">Offers</h5>
                  <p className="text-[11px] text-gray-400">Latest Deals</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIsElectricBuilderOpen(true)}
                className="bg-[#3749bb] hover:bg-[#2c3ca0] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5"
              >
                <Zap className="w-4 h-4 fill-white" />
                Setup Builder
              </button>

              <button
                type="button"
                onClick={() => (user ? logoutUser() : openAuthModal("login"))}
                className="flex items-center gap-2.5 hover:text-[#ef4a23] transition-colors group text-left"
              >
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-300">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white leading-tight">
                    {user ? user.name : "Account"}
                  </h5>
                  <p className="text-[11px] text-gray-400">
                    {user ? "Sign Out" : "Register or Login"}
                  </p>
                </div>
              </button>
            </div>

            {/* Right: Shopping Basket Icon (Exact matching Star Tech mobile screenshot 1) */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-1.5 text-white hover:text-orange-400 active:scale-95 transition"
                aria-label="View Cart"
              >
                {/* Star Tech signature shopping basket SVG icon */}
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 11 4-7" />
                  <path d="m19 11-4-7" />
                  <path d="M2 11h20" />
                  <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.6-7.4" />
                  <path d="m9 11 1 9" />
                  <path d="m15 11-1 9" />
                </svg>

                {/* Orange-Red badge showing cart count (matching Screenshot 1) */}
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#ef4a23] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow">
                  {cartTotalCount}
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Search Bar (Screenshot 1: Placed on light background right below dark header) */}
      <div className="lg:hidden bg-[#f2f4f8] px-3.5 pt-3 pb-1.5" ref={mobileSearchRef}>
        <div className="relative flex items-center bg-white rounded-xl shadow-xs border border-gray-300 overflow-hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            placeholder="Search"
            className="w-full text-gray-900 text-sm px-4 py-2.5 focus:outline-none placeholder-gray-500 font-medium"
          />
          <button
            type="button"
            onClick={() => setIsSearchFocused(true)}
            className="pr-4 text-gray-800 hover:text-[#ef4a23] transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-gray-800" />
          </button>
        </div>

        {/* Mobile Autocomplete Dropdown */}
        {isSearchFocused && searchQuery.trim() !== "" && (
          <div className="absolute left-3.5 right-3.5 mt-2 bg-white text-gray-900 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
            <div className="p-2.5 bg-gray-50 border-b text-xs font-semibold text-gray-500 flex justify-between items-center">
              <span>Products matching &quot;{searchQuery}&quot;</span>
              <span>{searchResults.length} found</span>
            </div>
            {searchResults.length > 0 ? (
              <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 flex items-center gap-3 hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => {
                      openQuickView(item);
                      setIsSearchFocused(false);
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-xl border border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate hover:text-[#ef4a23]">
                        {item.name}
                      </p>
                      <span className="text-sm font-bold text-[#ef4a23]">
                        {item.price.toLocaleString("en-BD")}৳
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">
                No products found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Category Navigation Bar (Desktop) */}
      <nav className="bg-white border-b border-gray-200 hidden lg:block shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-between text-[13px] font-semibold text-gray-800 tracking-tight">
            {navigationCategories.map((cat, idx) => (
              <li
                key={idx}
                className="group relative py-3 cursor-pointer"
                onMouseEnter={() => setActiveDropdown(idx)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center gap-1 group-hover:text-[#ef4a23] transition-colors whitespace-nowrap">
                  <span>{cat.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#ef4a23] transition-transform group-hover:rotate-180" />
                </div>

                {activeDropdown === idx && (
                  <div className="absolute top-full left-0 bg-white border border-gray-200 shadow-xl rounded-2xl p-6 w-[700px] z-50 animate-fadeIn grid grid-cols-2 gap-6">
                    {cat.subcategories.map((sub, sIdx) => (
                      <div key={sIdx} className="space-y-2">
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-1.5 text-[#ef4a23]">
                          {sub.name}
                        </h4>
                        <ul className="space-y-1.5 text-xs text-gray-600">
                          {sub.items.map((item, iIdx) => (
                            <li key={iIdx}>
                              <button
                                type="button"
                                onClick={() => {
                                  setSearchQuery(item);
                                  showToast(`Filtered by ${item}`);
                                  setActiveDropdown(null);
                                }}
                                className="hover:text-[#ef4a23] hover:translate-x-1 transition-all inline-block text-left"
                              >
                                {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer (Screenshot 2: Clean white slide-in list of categories with '+' icons) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-[72%] max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideIn">
            
            {/* Category List with + icon on right (Screenshot 2) */}
            <div className="divide-y divide-gray-100">
              {drawerCategories.map((cat, idx) => (
                <div key={idx}>
                  <div
                    onClick={() => {
                      toggleCategory(idx);
                      if (expandedCat === idx) {
                        setSearchQuery(cat.query);
                        setMobileMenuOpen(false);
                        showToast(`Showing ${cat.name}`);
                      }
                    }}
                    className="px-4 py-3 flex items-center justify-between text-sm font-medium text-gray-900 hover:text-[#ef4a23] cursor-pointer bg-white active:bg-gray-50 transition"
                  >
                    <span>{cat.name}</span>
                    <span className="text-gray-400 font-light text-lg leading-none">
                      {expandedCat === idx ? (
                        <Minus className="w-3.5 h-3.5 text-[#ef4a23]" />
                      ) : (
                        "+"
                      )}
                    </span>
                  </div>

                  {/* Subcategories when expanded */}
                  {expandedCat === idx && (
                    <div className="bg-gray-50 px-5 py-2.5 space-y-2 border-t border-gray-100 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery(cat.query);
                          setMobileMenuOpen(false);
                          showToast(`Browsing ${cat.name}`);
                        }}
                        className="font-bold text-[#ef4a23] hover:underline block text-left"
                      >
                        All in {cat.name} &rarr;
                      </button>
                      <div className="space-y-1.5 text-gray-600 pl-1">
                        <p
                          className="cursor-pointer hover:text-black"
                          onClick={() => {
                            setSearchQuery(cat.query);
                            setMobileMenuOpen(false);
                          }}
                        >
                          Latest Models
                        </p>
                        <p
                          className="cursor-pointer hover:text-black"
                          onClick={() => {
                            setSearchQuery(cat.query);
                            setMobileMenuOpen(false);
                          }}
                        >
                          Special Offers
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Contact Hotline */}
            <div className="p-4 bg-gray-50 border-t">
              <a
                href="tel:16793"
                className="flex items-center justify-center gap-2 py-2.5 bg-red-50 text-[#ef4a23] rounded-2xl font-bold text-xs"
              >
                <Phone className="w-4 h-4" />
                Hotline: 16793 (9 AM - 8 PM)
              </a>
            </div>

          </div>

          {/* Backdrop click to close */}
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

    </header>
  );
}
