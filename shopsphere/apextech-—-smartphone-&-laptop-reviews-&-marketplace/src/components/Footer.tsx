import React, { useState } from 'react';
import { ScreenId } from '../types';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="mt-12 bg-[#f2f3ff] text-[#004ac6] w-full border-t border-[#c3c6d7]/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Top row with brand and newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-[#c3c6d7]/30">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2563eb] text-white flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[20px] fill">bolt</span>
              </div>
              <span className="font-manrope text-2xl font-extrabold text-[#131b2e]">
                ApexTech
              </span>
            </div>
            <p className="text-xs md:text-sm text-[#434655] max-w-md mt-1.5 leading-relaxed">
              Authoritative device evaluations, synthetic lab tests, and real-time market metrics for laptops and smartphones.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email for weekly spec drops..."
              required
              className="bg-white border border-[#c3c6d7]/60 rounded-lg px-3.5 py-2 text-sm text-[#131b2e] placeholder:text-[#737686] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20"
            />
            <button
              type="submit"
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm px-4 py-2 rounded-lg font-semibold transition-colors shadow-xs active:scale-95"
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8">
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#131b2e] mb-3">
              Hardware Hubs
            </h5>
            <ul className="space-y-2 text-xs md:text-sm text-[#434655]">
              <li>
                <button
                  onClick={() => onNavigate('explore')}
                  className="hover:text-[#004ac6] transition-colors"
                >
                  Smartphones
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore')}
                  className="hover:text-[#004ac6] transition-colors"
                >
                  Laptops
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore')}
                  className="hover:text-[#004ac6] transition-colors"
                >
                  Ultrabooks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore')}
                  className="hover:text-[#004ac6] transition-colors"
                >
                  Gaming Rigs
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#131b2e] mb-3">
              Tools &amp; Benchmarks
            </h5>
            <ul className="space-y-2 text-xs md:text-sm text-[#434655]">
              <li>
                <button
                  onClick={() => onNavigate('compare')}
                  className="hover:text-[#004ac6] transition-colors"
                >
                  Comparisons
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('deals')}
                  className="hover:text-[#004ac6] transition-colors"
                >
                  Price Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('compare')}
                  className="hover:text-[#004ac6] transition-colors"
                >
                  Battery Life Index
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('compare')}
                  className="hover:text-[#004ac6] transition-colors"
                >
                  GPU Benchmark Scores
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#131b2e] mb-3">
              Orders &amp; Account
            </h5>
            <ul className="space-y-2 text-xs md:text-sm text-[#434655]">
              <li>
                <button
                  onClick={() => onNavigate('orders')}
                  className="hover:text-[#004ac6] transition-colors"
                >
                  Track My Shipments
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('wishlist')}
                  className="hover:text-[#004ac6] transition-colors"
                >
                  Saved Wishlist
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cart')}
                  className="hover:text-[#004ac6] transition-colors"
                >
                  Shopping Cart
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('account')}
                  className="hover:text-[#004ac6] transition-colors"
                >
                  Profile &amp; Settings
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#131b2e] mb-3">
              Company &amp; Support
            </h5>
            <ul className="space-y-2 text-xs md:text-sm text-[#434655]">
              <li>
                <button
                  onClick={() => onNavigate('account')}
                  className="hover:text-[#004ac6] transition-colors"
                >
                  24x7 Hardware Specialist
                </button>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#004ac6] transition-colors">
                  Testing Methodology
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#004ac6] transition-colors">
                  Affiliate Disclosures
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#004ac6] transition-colors">
                  Privacy &amp; Terms
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="pt-6 border-t border-[#c3c6d7]/30 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[#737686] text-center sm:text-left">
            © 2024 ApexTech Ltd. All rights reserved. High-performance device evaluations and marketplace metrics.
          </p>
          <div className="flex items-center gap-3 text-[#737686]">
            <span className="material-symbols-outlined text-[18px] cursor-pointer hover:text-[#004ac6]">
              terminal
            </span>
            <span className="material-symbols-outlined text-[18px] cursor-pointer hover:text-[#004ac6]">
              rss_feed
            </span>
            <span className="material-symbols-outlined text-[18px] cursor-pointer hover:text-[#004ac6]">
              verified_user
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
