"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { products } from "@/data/products";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);
  const [isElectricBuilderOpen, setIsElectricBuilderOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [user, setUser] = useState(null);

  // Load from localStorage on client
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("electric_bd_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("electric_bd_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedUser = localStorage.getItem("electric_bd_user");
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch (e) {
      console.error("Local storage load error", e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("electric_bd_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  }, [cart]);

  // Toast trigger
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name.slice(0, 30)}..." to Cart!`);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast("Item removed from Cart");
  };

  const updateCartQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      try {
        localStorage.setItem("electric_bd_wishlist", JSON.stringify(updated));
      } catch (e) {}
      showToast(exists ? "Removed from Wishlist" : "Saved to Wishlist!");
      return updated;
    });
  };

  // Quick View
  const openQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Auth
  const openAuthModal = (mode = "login") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("electric_bd_user", JSON.stringify(userData));
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${userData.name}!`);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("electric_bd_user");
    showToast("Logged out successfully");
  };

  // Totals
  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalCount,
        cartTotalPrice,
        wishlist,
        toggleWishlist,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        openAuthModal,
        user,
        loginUser,
        logoutUser,
        isStoreLocatorOpen,
        setIsStoreLocatorOpen,
        isElectricBuilderOpen,
        setIsElectricBuilderOpen,
        isCalculatorOpen,
        setIsCalculatorOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
