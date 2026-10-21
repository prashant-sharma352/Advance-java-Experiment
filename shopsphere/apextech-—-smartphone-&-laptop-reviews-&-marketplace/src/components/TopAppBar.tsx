import React, { useState } from 'react';
import { ScreenId } from '../types';

interface TopAppBarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId, params?: Record<string, string>) => void;
  wishlistCount: number;
  cartCount: number;
  onToggleDrawer: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onPerformSearch?: (term: string) => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  currentScreen,
  onNavigate,
  wishlistCount,
  cartCount,
  onToggleDrawer,
  searchQuery,
  setSearchQuery,
  onPerformSearch,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // If we are in focused transactional flows (Checkout), the TopAppBar is simplified or customized per screen
  if (currentScreen === 'checkout') {
    return null; // Handled specially inside Checkout screen for dedicated transactional flow
  }

  return (
    <>
      {/* 1. NOTIFICATION PROMO STRIP */}
      <div className="bg-[#004ac6] text-white text-center px-3 py-1.5 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs select-none">
        <span className="inline-block animate-pulse">🔥</span>
        <span>Today's Tech Deals: Up to 35% off flagship phones &amp; M3 laptops</span>
        <button
          onClick={() => onNavigate('deals')}
          className="hidden sm:inline font-bold underline cursor-pointer ml-1 hover:text-[#eaedff] transition-colors"
        >
          Claim Deal
        </button>
      </div>

      {/* 2. STICKY TOP APP BAR */}
      <header className="bg-white/90 backdrop-blur-md text-[#004ac6] top-0 sticky z-40 shadow-xs border-b border-[#c3c6d7]/30">
        <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-7xl mx-auto py-2.5 gap-2">
          {/* Leading Menu Icon & Brand Identity */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onToggleDrawer}
              aria-label="Toggle Navigation Drawer"
              className="p-1.5 rounded-lg text-[#131b2e] hover:bg-[#eaedff] active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[26px]">menu</span>
            </button>
            <button
              onClick={() => onNavigate('explore')}
              className="flex items-center gap-1.5 group text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center text-white shadow-xs group-hover:bg-[#004ac6] transition-colors">
                <span className="material-symbols-outlined text-[20px] fill">bolt</span>
              </div>
              <span className="font-manrope text-xl md:text-2xl tracking-tight font-extrabold text-[#131b2e]">
                Apex<span className="text-[#004ac6]">Tech</span>
              </span>
            </button>
          </div>

          {/* Center Nav Links on Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate('explore')}
              className={`font-semibold text-sm transition-colors ${
                currentScreen === 'explore'
                  ? 'text-[#004ac6] font-bold border-b-2 border-[#004ac6] pb-0.5'
                  : 'text-[#434655] hover:text-[#004ac6]'
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => {
                onNavigate('explore');
                onPerformSearch?.('smartphones');
              }}
              className="text-[#434655] font-semibold text-sm hover:text-[#004ac6] transition-colors"
            >
              Smartphones
            </button>
            <button
              onClick={() => {
                onNavigate('explore');
                onPerformSearch?.('laptops');
              }}
              className="text-[#434655] font-semibold text-sm hover:text-[#004ac6] transition-colors"
            >
              Laptops
            </button>
            <button
              onClick={() => onNavigate('compare')}
              className={`font-semibold text-sm transition-colors ${
                currentScreen === 'compare'
                  ? 'text-[#004ac6] font-bold border-b-2 border-[#004ac6] pb-0.5'
                  : 'text-[#434655] hover:text-[#004ac6]'
              }`}
            >
              Compare
            </button>
            <button
              onClick={() => onNavigate('deals')}
              className={`font-semibold text-sm transition-colors ${
                currentScreen === 'deals'
                  ? 'text-[#004ac6] font-bold border-b-2 border-[#004ac6] pb-0.5'
                  : 'text-[#434655] hover:text-[#004ac6]'
              }`}
            >
              Deals
            </button>
            <button
              onClick={() => onNavigate('orders')}
              className={`font-semibold text-sm transition-colors ${
                currentScreen === 'orders'
                  ? 'text-[#004ac6] font-bold border-b-2 border-[#004ac6] pb-0.5'
                  : 'text-[#434655] hover:text-[#004ac6]'
              }`}
            >
              My Orders
            </button>
          </nav>

          {/* Action Cluster: Wishlist, Cart, User Avatar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('wishlist')}
              aria-label="Wishlist"
              className="relative p-2 rounded-lg text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
              title="Saved Wishlist"
            >
              <span className="material-symbols-outlined text-[24px]">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#2563eb] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-tight shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('cart')}
              aria-label="Cart"
              className="relative p-2 rounded-lg text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
              title="Shopping Cart"
            >
              <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#004ac6] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-tight shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('account')}
              aria-label="User Account"
              className="w-8 h-8 rounded-full border border-[#c3c6d7] bg-[#eaedff] flex items-center justify-center text-[#131b2e] hover:border-[#2563eb] hover:bg-[#dbe1ff] transition-colors font-bold text-xs"
              title="Profile Hub"
            >
              RP
            </button>
          </div>
        </div>

        {/* Search Bar Row (rendered on Explore & product browsing) */}
        {currentScreen === 'explore' && (
          <div className="px-4 md:px-8 max-w-7xl mx-auto pb-2.5 pt-0.5">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737686] text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Search mobiles, laptops, brands (e.g. S25 Ultra, MacBook, ₹30k)..."
                className="w-full bg-white border border-[#c3c6d7]/70 rounded-lg pl-10 pr-10 py-2 text-[#131b2e] placeholder:text-[#737686] text-sm focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all shadow-xs"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] hover:text-[#ba1a1a] text-[18px]"
                >
                  cancel
                </button>
              ) : (
                <button
                  onClick={() => onPerformSearch?.(searchQuery)}
                  className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] hover:text-[#004ac6] text-[20px]"
                >
                  tune
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
