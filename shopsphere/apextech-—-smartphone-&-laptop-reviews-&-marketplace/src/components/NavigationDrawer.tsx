import React from 'react';
import { ScreenId } from '../types';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#283044]/50 backdrop-blur-xs z-50 transition-opacity flex"
      onClick={onClose}
    >
      <aside
        className="bg-white text-[#004ac6] h-full w-80 max-w-[85vw] flex flex-col border-r border-[#c3c6d7]/40 shadow-2xl p-4 justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#c3c6d7]/30">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center text-white shadow-xs">
                <span className="material-symbols-outlined text-[20px] fill">bolt</span>
              </div>
              <span className="font-manrope text-xl font-extrabold text-[#131b2e]">
                ApexTech
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-[#737686] hover:bg-[#eaedff] transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          <div className="mt-4 font-manrope text-sm font-bold text-[#131b2e] mb-2 px-2">
            ApexTech Navigation
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => {
                onNavigate('explore');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#131b2e] hover:bg-[#f2f3ff] transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[22px] text-[#004ac6]">explore</span>
              <span className="font-semibold text-sm">Explore Hub</span>
            </button>

            <button
              onClick={() => {
                onNavigate('explore');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#434655] hover:bg-[#f2f3ff] transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[22px]">smartphone</span>
              <span className="font-semibold text-sm">Smartphones</span>
            </button>

            <button
              onClick={() => {
                onNavigate('explore');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#434655] hover:bg-[#f2f3ff] transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[22px]">laptop_mac</span>
              <span className="font-semibold text-sm">Laptops</span>
            </button>

            <button
              onClick={() => {
                onNavigate('compare');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#434655] hover:bg-[#f2f3ff] transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[22px]">compare_arrows</span>
              <span className="font-semibold text-sm">Compare Specs</span>
            </button>

            <button
              onClick={() => {
                onNavigate('deals');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#434655] hover:bg-[#f2f3ff] transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[22px]">local_offer</span>
              <span className="font-semibold text-sm">Tech Deals &amp; Price Drops</span>
            </button>

            <button
              onClick={() => {
                onNavigate('wishlist');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#434655] hover:bg-[#f2f3ff] transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[22px]">favorite_border</span>
              <span className="font-semibold text-sm">Wishlist &amp; Saved Devices</span>
            </button>

            <button
              onClick={() => {
                onNavigate('cart');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#434655] hover:bg-[#f2f3ff] transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              <span className="font-semibold text-sm">Shopping Cart</span>
            </button>

            <button
              onClick={() => {
                onNavigate('orders');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#434655] hover:bg-[#f2f3ff] transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[22px]">local_shipping</span>
              <span className="font-semibold text-sm">My Orders &amp; Live Tracking</span>
            </button>

            <button
              onClick={() => {
                onNavigate('account');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#434655] hover:bg-[#f2f3ff] transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[22px]">person_outline</span>
              <span className="font-semibold text-sm">User Profile &amp; Settings</span>
            </button>
          </nav>
        </div>

        {/* Footer info in drawer */}
        <div className="pt-4 border-t border-[#c3c6d7]/30 text-xs text-[#737686]">
          <p className="font-mono-code font-semibold text-[#131b2e]">
            ApexTech Precision Metric Engine
          </p>
          <p className="mt-1">v2.4.0 • Updated Hardware Lab Benchmarks</p>
        </div>
      </aside>
    </div>
  );
};
