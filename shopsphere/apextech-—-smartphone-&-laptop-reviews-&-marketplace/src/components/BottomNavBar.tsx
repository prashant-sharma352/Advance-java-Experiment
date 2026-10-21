import React from 'react';
import { ScreenId } from '../types';

interface BottomNavBarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  compareCount?: number;
  wishlistCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  onNavigate,
  compareCount = 2,
  wishlistCount = 0,
}) => {
  // Do not render bottom nav on checkout to keep focused checkout flow (as indicated in design)
  if (currentScreen === 'checkout') {
    return null;
  }

  const navItems: { id: ScreenId; label: string; icon: string; badge?: number }[] = [
    { id: 'explore', label: 'Explore', icon: 'explore' },
    { id: 'compare', label: 'Compare', icon: 'compare_arrows', badge: compareCount },
    { id: 'deals', label: 'Deals', icon: 'sell' },
    { id: 'wishlist', label: 'Wishlist', icon: 'favorite_border', badge: wishlistCount },
    { id: 'account', label: 'Account', icon: 'person_outline' },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] border-t border-[#c3c6d7]/40 flex justify-around items-center px-2 py-1 max-w-lg mx-auto"
    >
      {navItems.map((item) => {
        const isActive =
          currentScreen === item.id ||
          (item.id === 'account' && (currentScreen === 'orders' || currentScreen === 'auth')) ||
          (item.id === 'explore' && currentScreen === 'product-detail');

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-90 ${
              isActive
                ? 'text-[#004ac6] font-bold'
                : 'text-[#434655] hover:text-[#004ac6]'
            }`}
          >
            <div className="relative flex flex-col items-center">
              <span
                className={`material-symbols-outlined text-[24px] ${
                  isActive ? 'fill' : ''
                }`}
              >
                {item.icon}
              </span>
              <span className="text-[11px] font-medium mt-0.5 tracking-tight">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] mt-0.5 absolute -bottom-1" />
              )}
            </div>

            {item.badge !== undefined && item.badge > 0 && !isActive && (
              <span className="absolute top-0.5 right-3 bg-[#1d4ed8] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full shadow-xs">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
