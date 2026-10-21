import React, { useState } from 'react';
import { Product, ScreenId } from '../types';
import { PRODUCTS } from '../data/mockData';

interface ExploreScreenProps {
  onNavigate: (screen: ScreenId, params?: Record<string, string>) => void;
  onSelectProduct: (productId: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
  onAddToCart: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  onNavigate,
  onSelectProduct,
  onToggleWishlist,
  wishlistIds,
  onAddToCart,
  searchQuery,
  setSearchQuery,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'under30k' | '5g' | 'gaming' | 'battery' | 'thin'>('all');
  const [activeCategoryTab, setActiveCategoryTab] = useState<'all' | 'smartphones' | 'laptops'>('all');

  const allProductsList: Product[] = [
    PRODUCTS['s25-ultra'],
    PRODUCTS['macbook-air-m3'],
    PRODUCTS['oneplus-nord-4'],
    PRODUCTS['asus-rog-g16'],
  ];

  // Filtering logic
  const filteredProducts = allProductsList.filter((item) => {
    if (activeCategoryTab !== 'all' && item.category !== activeCategoryTab) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.specs.some((s) => s.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (activeFilter === 'under30k') return item.price <= 30000;
    if (activeFilter === '5g') return item.category === 'smartphones';
    if (activeFilter === 'gaming') return item.category === 'laptops' || item.name.includes('ROG');
    if (activeFilter === 'battery') return item.specs.some((s) => s.includes('5000') || s.includes('5500') || s.includes('18h'));
    if (activeFilter === 'thin') return item.category === 'laptops' || item.name.includes('Air');
    return true;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 space-y-8 mt-3 pb-16">
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#eaedff] to-[#faf8ff] border border-[#c3c6d7]/40 p-5 md:p-10 shadow-xs">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/80 border border-[#c3c6d7]/40 rounded-full px-3 py-1 mb-3 text-[#004ac6] font-mono-code text-xs shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#007f36] animate-pulse" />
            2025 Benchmark Tests Live
          </div>

          <h1 className="font-manrope text-3xl md:text-5xl font-extrabold text-[#131b2e] tracking-tight leading-tight">
            Find the Right Tech for You
          </h1>

          <p className="mt-3 text-sm md:text-base text-[#434655] max-w-xl leading-relaxed">
            Compare mobiles and laptops, explore specifications, read reviews, and find the best device for your needs.
          </p>

          {/* Dual Prominent CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => {
                setActiveCategoryTab('smartphones');
                setActiveFilter('all');
              }}
              className="flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold px-5 py-3 rounded-lg shadow-xs transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">smartphone</span>
              <span>Explore Mobiles</span>
            </button>

            <button
              onClick={() => {
                setActiveCategoryTab('laptops');
                setActiveFilter('all');
              }}
              className="flex items-center justify-center gap-2 bg-white hover:bg-[#eaedff] border border-[#c3c6d7] text-[#131b2e] text-sm font-semibold px-5 py-3 rounded-lg shadow-xs transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">laptop_mac</span>
              <span>Explore Laptops</span>
            </button>
          </div>

          {/* Interactive Quick Search Dropdown Preview (Trending & Recent) */}
          <div className="mt-6 bg-white/90 backdrop-blur-xs border border-[#c3c6d7]/40 rounded-xl p-3 shadow-xs">
            <div className="flex items-center justify-between text-[#737686] text-xs pb-2 border-b border-[#c3c6d7]/20 mb-2">
              <span className="font-mono-code uppercase tracking-wider flex items-center gap-1 font-semibold text-[#131b2e]">
                <span className="material-symbols-outlined text-[15px] text-[#004ac6]">trending_up</span> Trending Searches
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#004ac6] font-medium text-xs hover:underline"
              >
                Clear History
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'iPhone 16 Pro', icon: 'history' },
                { label: 'Snapdragon 8 Gen 3', icon: 'bolt' },
                { label: 'Best Laptop under ₹60,000', icon: 'laptop' },
                { label: 'M3 MacBook Air', icon: 'verified' },
              ].map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(pill.label)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f2f3ff] hover:bg-[#e2e7ff] rounded-full text-xs font-semibold text-[#131b2e] border border-[#c3c6d7]/30 transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#737686]">
                    {pill.icon}
                  </span>
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. QUICK CATEGORIES GRID ==================== */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-manrope text-xl font-bold text-[#131b2e]">Explore Categories</h2>
          <span className="font-mono-code text-xs text-[#737686]">5 Primary Hubs</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {/* Smartphones */}
          <button
            onClick={() => {
              setActiveCategoryTab('smartphones');
              setActiveFilter('all');
            }}
            className="group bg-white hover:bg-[#f2f3ff] border border-[#c3c6d7]/50 rounded-xl p-3.5 flex flex-col justify-between transition-all duration-150 hover:shadow-md hover:border-[#2563eb] text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#004ac6] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">smartphone</span>
            </div>
            <div className="mt-3">
              <div className="font-manrope text-sm font-bold text-[#131b2e] flex items-center justify-between">
                Smartphones
                <span className="material-symbols-outlined text-[#737686] group-hover:text-[#004ac6] text-[18px]">
                  arrow_forward
                </span>
              </div>
              <p className="text-xs text-[#434655] line-clamp-1 mt-0.5">Latest flagships &amp; budget kings</p>
            </div>
          </button>

          {/* Laptops */}
          <button
            onClick={() => {
              setActiveCategoryTab('laptops');
              setActiveFilter('all');
            }}
            className="group bg-white hover:bg-[#f2f3ff] border border-[#c3c6d7]/50 rounded-xl p-3.5 flex flex-col justify-between transition-all duration-150 hover:shadow-md hover:border-[#2563eb] text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#1d4ed8] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">laptop_mac</span>
            </div>
            <div className="mt-3">
              <div className="font-manrope text-sm font-bold text-[#131b2e] flex items-center justify-between">
                Laptops
                <span className="material-symbols-outlined text-[#737686] group-hover:text-[#004ac6] text-[18px]">
                  arrow_forward
                </span>
              </div>
              <p className="text-xs text-[#434655] line-clamp-1 mt-0.5">Ultrabooks &amp; gaming rigs</p>
            </div>
          </button>

          {/* Compare */}
          <button
            onClick={() => onNavigate('compare')}
            className="group bg-white hover:bg-[#f2f3ff] border border-[#c3c6d7]/50 rounded-xl p-3.5 flex flex-col justify-between transition-all duration-150 hover:shadow-md hover:border-[#2563eb] text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#2563eb] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">compare_arrows</span>
            </div>
            <div className="mt-3">
              <div className="font-manrope text-sm font-bold text-[#131b2e] flex items-center justify-between">
                Compare
                <span className="material-symbols-outlined text-[#737686] group-hover:text-[#004ac6] text-[18px]">
                  arrow_forward
                </span>
              </div>
              <p className="text-xs text-[#434655] line-clamp-1 mt-0.5">Side-by-side spec showdown</p>
            </div>
          </button>

          {/* Deals */}
          <button
            onClick={() => onNavigate('deals')}
            className="group bg-white hover:bg-[#f2f3ff] border border-[#c3c6d7]/50 rounded-xl p-3.5 flex flex-col justify-between transition-all duration-150 hover:shadow-md hover:border-[#2563eb] text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-[#007f36] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">local_offer</span>
            </div>
            <div className="mt-3">
              <div className="font-manrope text-sm font-bold text-[#131b2e] flex items-center justify-between">
                Deals
                <span className="material-symbols-outlined text-[#737686] group-hover:text-[#004ac6] text-[18px]">
                  arrow_forward
                </span>
              </div>
              <p className="text-xs text-[#434655] line-clamp-1 mt-0.5">Live drops &amp; bank discounts</p>
            </div>
          </button>

          {/* Reviews */}
          <button
            onClick={() => onSelectProduct('s25-ultra')}
            className="group col-span-2 md:col-span-1 bg-white hover:bg-[#f2f3ff] border border-[#c3c6d7]/50 rounded-xl p-3.5 flex flex-col justify-between transition-all duration-150 hover:shadow-md hover:border-[#2563eb] text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#004ac6] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">rate_review</span>
            </div>
            <div className="mt-3">
              <div className="font-manrope text-sm font-bold text-[#131b2e] flex items-center justify-between">
                Reviews
                <span className="material-symbols-outlined text-[#737686] group-hover:text-[#004ac6] text-[18px]">
                  arrow_forward
                </span>
              </div>
              <p className="text-xs text-[#434655] line-clamp-1 mt-0.5">In-depth lab scores &amp; tests</p>
            </div>
          </button>
        </div>
      </section>

      {/* ==================== 3. QUICK FILTER CHIPS BAR ==================== */}
      <section className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => {
            setActiveFilter('all');
            setActiveCategoryTab('all');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#eaedff] border border-[#737686] text-[#131b2e] rounded-lg text-xs font-semibold shrink-0 shadow-xs hover:border-[#2563eb]"
        >
          <span className="material-symbols-outlined text-[16px]">filter_list</span>
          <span>Reset Filters</span>
        </button>

        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors shadow-xs ${
            activeFilter === 'all'
              ? 'bg-[#2563eb] text-white'
              : 'bg-white border border-[#c3c6d7]/60 text-[#131b2e] hover:bg-[#f2f3ff]'
          }`}
        >
          All
        </button>

        <button
          onClick={() => setActiveFilter('under30k')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors shadow-xs ${
            activeFilter === 'under30k'
              ? 'bg-[#2563eb] text-white'
              : 'bg-white border border-[#c3c6d7]/60 text-[#131b2e] hover:bg-[#f2f3ff]'
          }`}
        >
          Under ₹30,000
        </button>

        <button
          onClick={() => setActiveFilter('5g')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors shadow-xs ${
            activeFilter === '5g'
              ? 'bg-[#2563eb] text-white'
              : 'bg-white border border-[#c3c6d7]/60 text-[#131b2e] hover:bg-[#f2f3ff]'
          }`}
        >
          5G Phones
        </button>

        <button
          onClick={() => setActiveFilter('gaming')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors shadow-xs ${
            activeFilter === 'gaming'
              ? 'bg-[#2563eb] text-white'
              : 'bg-white border border-[#c3c6d7]/60 text-[#131b2e] hover:bg-[#f2f3ff]'
          }`}
        >
          Gaming Laptops
        </button>

        <button
          onClick={() => setActiveFilter('battery')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors shadow-xs ${
            activeFilter === 'battery'
              ? 'bg-[#2563eb] text-white'
              : 'bg-white border border-[#c3c6d7]/60 text-[#131b2e] hover:bg-[#f2f3ff]'
          }`}
        >
          Battery Monsters (5000mAh+)
        </button>

        <button
          onClick={() => setActiveFilter('thin')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors shadow-xs ${
            activeFilter === 'thin'
              ? 'bg-[#2563eb] text-white'
              : 'bg-white border border-[#c3c6d7]/60 text-[#131b2e] hover:bg-[#f2f3ff]'
          }`}
        >
          Thin &amp; Light
        </button>
      </section>

      {/* ==================== 4. PRODUCT DISCOVERY — 'Explore Latest Devices' ==================== */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-manrope text-2xl font-bold text-[#131b2e]">Explore Latest Devices</h2>
            <p className="text-xs text-[#434655]">
              Lab tested specs, benchmark ratings, and real-time market pricing.
            </p>
          </div>
          <button
            onClick={() => setActiveFilter('all')}
            className="text-xs font-semibold text-[#004ac6] hover:underline flex items-center gap-1 shrink-0"
          >
            View All ({filteredProducts.length}) <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-[#c3c6d7] p-8">
            <span className="material-symbols-outlined text-4xl text-[#737686]">search_off</span>
            <p className="font-semibold text-sm text-[#131b2e] mt-2">No matching devices found</p>
            <p className="text-xs text-[#737686] mt-1">Try clearing filters or search terms</p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setActiveCategoryTab('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#2563eb] text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.has(product.id);

              return (
                <article
                  key={product.id}
                  className="bg-white border border-[#c3c6d7]/50 rounded-xl overflow-hidden hover:border-[#2563eb] hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Bay */}
                    <div className="relative bg-[#f2f3ff] h-48 flex items-center justify-center p-3">
                      {product.badge && (
                        <span
                          className={`absolute top-2.5 right-2.5 text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs ${
                            product.badgeType === 'staff-pick'
                              ? 'bg-[#2563eb] text-white'
                              : product.badgeType === 'value'
                              ? 'bg-[#dce1ff] text-[#001551]'
                              : product.badgeType === 'feature'
                              ? 'bg-[#d2d9f4] text-[#131b2e]'
                              : 'bg-[#006329] text-white'
                          }`}
                        >
                          {product.badge}
                        </span>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product);
                        }}
                        aria-label="Add to Wishlist"
                        className={`absolute top-2.5 left-2.5 p-1.5 rounded-full bg-white/80 transition-colors ${
                          isWishlisted ? 'text-[#ba1a1a]' : 'text-[#434655] hover:text-[#ba1a1a]'
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-[18px] ${
                            isWishlisted ? 'fill' : ''
                          }`}
                        >
                          favorite
                        </span>
                      </button>

                      <img
                        src={product.image}
                        alt={product.name}
                        onClick={() => onSelectProduct(product.id)}
                        className="h-36 object-contain mix-blend-multiply cursor-pointer group-hover:scale-105 transition-transform duration-200"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Content Bay */}
                    <div className="p-4">
                      {/* Rating */}
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="bg-[#006329] text-white font-bold text-[11px] px-1.5 py-0.2 rounded flex items-center gap-0.5">
                          ★ {product.rating}
                        </span>
                        <span className="text-xs text-[#737686]">
                          ({product.reviewsCount.toLocaleString()} reviews)
                        </span>
                      </div>

                      <h3
                        onClick={() => onSelectProduct(product.id)}
                        className="font-manrope text-sm font-bold text-[#131b2e] line-clamp-1 hover:text-[#004ac6] cursor-pointer"
                      >
                        {product.name}
                      </h3>

                      {/* Pricing */}
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="font-manrope text-lg font-bold text-[#131b2e]">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs text-[#737686] line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        {product.freeDelivery && (
                          <span className="font-mono-code text-[11px] text-[#006329] font-semibold ml-auto">
                            Free Delivery
                          </span>
                        )}
                      </div>

                      {/* Specs Chips */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {product.specs.map((spec, sIdx) => (
                          <span
                            key={sIdx}
                            className="font-mono-code text-[11px] bg-[#eaedff] px-2 py-0.5 rounded text-[#434655]"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card CTAs */}
                  <div className="p-4 pt-0 flex gap-2">
                    <button
                      onClick={() => onNavigate('compare')}
                      className="flex-1 py-2 rounded-lg border border-[#c3c6d7] hover:bg-[#eaedff] text-[#131b2e] text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
                      Compare
                    </button>
                    <button
                      onClick={() => onSelectProduct(product.id)}
                      className="flex-1 py-2 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ==================== 5. QUICK COMPARISON TEASER ==================== */}
      <section className="bg-[#f2f3ff] border border-[#c3c6d7]/60 rounded-2xl p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
          <div>
            <span className="font-mono-code text-xs text-[#004ac6] font-bold uppercase tracking-wider">
              Side-By-Side Spec Showdown
            </span>
            <h2 className="font-manrope text-xl font-bold text-[#131b2e]">
              Quick Comparison: Galaxy S25 Ultra vs iPhone 16 Pro
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#007f36]" />
            <span className="text-xs text-[#434655]">Lab Verified Benchmarks</span>
          </div>
        </div>

        {/* Comparison Matrix View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Device 1: S25 Ultra */}
          <div className="bg-white border border-[#c3c6d7]/40 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#c3c6d7]/30">
              <div>
                <span className="text-xs font-semibold text-[#004ac6]">Contender A</span>
                <h3 className="font-manrope text-base font-bold text-[#131b2e]">
                  Galaxy S25 Ultra
                </h3>
              </div>
              <span className="font-manrope text-lg font-bold text-[#131b2e]">
                ₹1,24,999
              </span>
            </div>
            <div className="mt-3 space-y-2.5 text-xs md:text-sm">
              <div className="flex items-center justify-between py-1 bg-[#f2f3ff]/70 px-2 rounded">
                <span className="text-[#434655] font-medium">Display Quality</span>
                <span className="font-bold text-[#006329] flex items-center gap-1">
                  Samsung <span className="material-symbols-outlined text-[16px]">check_circle</span>
                </span>
              </div>
              <div className="flex items-center justify-between py-1 bg-[#f2f3ff]/70 px-2 rounded">
                <span className="text-[#434655] font-medium">Camera Telephoto Zoom</span>
                <span className="font-bold text-[#006329] flex items-center gap-1">
                  Samsung 5x/100x <span className="material-symbols-outlined text-[16px]">check_circle</span>
                </span>
              </div>
              <div className="flex items-center justify-between py-1 px-2">
                <span className="text-[#434655] font-medium">Performance Benchmark</span>
                <span className="text-[#737686] text-xs font-mono-code">Snapdragon 8 Elite (Geekbench: 10,240)</span>
              </div>
              <div className="flex items-center justify-between py-1 bg-[#f2f3ff]/70 px-2 rounded">
                <span className="text-[#434655] font-medium">Battery Endurance</span>
                <span className="font-bold text-[#006329] flex items-center gap-1">
                  Samsung 16h 42m <span className="material-symbols-outlined text-[16px]">check_circle</span>
                </span>
              </div>
            </div>
          </div>

          {/* Device 2: iPhone 16 Pro */}
          <div className="bg-white border border-[#c3c6d7]/40 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#c3c6d7]/30">
              <div>
                <span className="text-xs font-semibold text-[#1d4ed8]">Contender B</span>
                <h3 className="font-manrope text-base font-bold text-[#131b2e]">
                  iPhone 16 Pro Max
                </h3>
              </div>
              <span className="font-manrope text-lg font-bold text-[#131b2e]">
                ₹1,34,900
              </span>
            </div>
            <div className="mt-3 space-y-2.5 text-xs md:text-sm">
              <div className="flex items-center justify-between py-1 px-2">
                <span className="text-[#434655] font-medium">Display Quality</span>
                <span className="text-[#737686] text-xs">Super Retina XDR 120Hz</span>
              </div>
              <div className="flex items-center justify-between py-1 px-2">
                <span className="text-[#434655] font-medium">Camera Telephoto Zoom</span>
                <span className="text-[#737686] text-xs">5x Optical Tetraprism</span>
              </div>
              <div className="flex items-center justify-between py-1 bg-[#f2f3ff]/70 px-2 rounded">
                <span className="text-[#434655] font-medium">Performance Benchmark</span>
                <span className="font-bold text-[#006329] flex items-center gap-1">
                  Apple A18 Pro <span className="material-symbols-outlined text-[16px]">check_circle</span>
                </span>
              </div>
              <div className="flex items-center justify-between py-1 px-2">
                <span className="text-[#434655] font-medium">Battery Endurance</span>
                <span className="text-[#737686] text-xs">17h 04m Video Playback</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => onNavigate('compare')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#131b2e] text-white font-semibold text-xs md:text-sm px-6 py-2.5 rounded-lg shadow-xs hover:bg-black transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">table_chart</span>
            Launch Full 4-Device Comparison Table
          </button>
        </div>
      </section>

      {/* ==================== 6. DEALS OF THE DAY ==================== */}
      <section>
        <div className="bg-gradient-to-r from-[#dbe1ff] to-[#dce1ff]/40 p-4 rounded-xl border border-[#c3c6d7]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#2563eb] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">timer</span>
            </div>
            <div>
              <h2 className="font-manrope text-base font-bold text-[#131b2e]">Deals of the Day</h2>
              <p className="text-xs text-[#434655]">
                Verified price cuts across Amazon, Flipkart &amp; direct brands
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#c3c6d7]/40 shadow-xs self-start sm:self-auto font-mono-code text-xs font-bold text-[#ba1a1a]">
            <span className="material-symbols-outlined text-[18px] animate-spin">alarm</span>
            <span>Deals refresh in 04h : 28m : 12s</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Deal Item 1 */}
          <div
            onClick={() => onNavigate('deals')}
            className="bg-white border border-[#c3c6d7]/40 rounded-xl p-4 flex gap-3 items-center hover:border-[#2563eb] transition-all cursor-pointer"
          >
            <div className="w-20 h-20 rounded-lg bg-[#f2f3ff] shrink-0 flex items-center justify-center p-1.5">
              <img
                src={PRODUCTS['dell-xps-13-plus'].image}
                alt="Dell XPS 13 Plus"
                className="max-h-full object-contain mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="bg-[#006329] text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
                  Save ₹12,000
                </span>
                <span className="font-mono-code text-[#737686] text-[11px]">Amazon</span>
              </div>
              <h4 className="font-manrope text-sm font-bold text-[#131b2e] truncate mt-1">
                Dell XPS 13 Plus
              </h4>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-manrope text-base font-extrabold text-[#131b2e]">
                  ₹1,14,990
                </span>
                <span className="text-xs text-[#737686] line-through">₹1,26,990</span>
              </div>
            </div>
          </div>

          {/* Deal Item 2 */}
          <div
            onClick={() => onNavigate('deals')}
            className="bg-white border border-[#c3c6d7]/40 rounded-xl p-4 flex gap-3 items-center hover:border-[#2563eb] transition-all cursor-pointer"
          >
            <div className="w-20 h-20 rounded-lg bg-[#f2f3ff] shrink-0 flex items-center justify-center p-1.5">
              <img
                src={PRODUCTS['pixel-9'].image}
                alt="Pixel 9"
                className="max-h-full object-contain mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="bg-[#006329] text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
                  28% OFF
                </span>
                <span className="font-mono-code text-[#737686] text-[11px]">Flipkart</span>
              </div>
              <h4 className="font-manrope text-sm font-bold text-[#131b2e] truncate mt-1">
                Pixel 9 (128GB)
              </h4>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-manrope text-base font-extrabold text-[#131b2e]">
                  ₹57,999
                </span>
                <span className="text-xs text-[#737686] line-through">₹79,999</span>
              </div>
            </div>
          </div>

          {/* Deal Item 3 */}
          <div
            onClick={() => onNavigate('deals')}
            className="bg-white border border-[#c3c6d7]/40 rounded-xl p-4 flex gap-3 items-center hover:border-[#2563eb] transition-all cursor-pointer"
          >
            <div className="w-20 h-20 rounded-lg bg-[#f2f3ff] shrink-0 flex items-center justify-center p-1.5">
              <img
                src={PRODUCTS['ipad-air-m2'].image}
                alt="iPad Air M2"
                className="max-h-full object-contain mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="bg-[#006329] text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
                  18% OFF
                </span>
                <span className="font-mono-code text-[#737686] text-[11px]">Official Store</span>
              </div>
              <h4 className="font-manrope text-sm font-bold text-[#131b2e] truncate mt-1">
                iPad Air M2 (11")
              </h4>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-manrope text-base font-extrabold text-[#131b2e]">
                  ₹48,900
                </span>
                <span className="text-xs text-[#737686] line-through">₹59,900</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 7. EXPERT SCORE BREAKDOWN ==================== */}
      <section className="bg-white border border-[#c3c6d7]/50 rounded-2xl p-5 md:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#c3c6d7]/30">
          <div>
            <span className="font-mono-code text-xs text-[#004ac6] font-bold uppercase">
              ApexTech Hardware Lab Benchmarks
            </span>
            <h2 className="font-manrope text-2xl font-bold text-[#131b2e]">
              Expert Score Breakdown: S25 Ultra
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-[#006329] text-white font-manrope text-2xl flex items-center justify-center font-extrabold shadow-xs">
              9.4
            </div>
            <div className="text-xs">
              <div className="font-bold text-[#131b2e]">Overall Lab Score</div>
              <div className="text-[#737686]">Based on 124 benchmark runs</div>
            </div>
          </div>
        </div>

        {/* Score Breakdown Sliders */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-5">
          <div className="p-3 bg-[#f2f3ff] rounded-xl border border-[#c3c6d7]/30">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-xs md:text-sm text-[#131b2e]">Display</span>
              <span className="font-mono-code font-bold text-[#004ac6] text-xs">9.6 / 10</span>
            </div>
            <div className="w-full bg-[#c3c6d7]/40 h-2 rounded-full overflow-hidden">
              <div className="bg-[#2563eb] h-full rounded-full" style={{ width: '96%' }} />
            </div>
            <span className="text-[11px] text-[#737686] mt-1 block">Peak 2,600 nits anti-reflective</span>
          </div>

          <div className="p-3 bg-[#f2f3ff] rounded-xl border border-[#c3c6d7]/30">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-xs md:text-sm text-[#131b2e]">Battery</span>
              <span className="font-mono-code font-bold text-[#004ac6] text-xs">9.2 / 10</span>
            </div>
            <div className="w-full bg-[#c3c6d7]/40 h-2 rounded-full overflow-hidden">
              <div className="bg-[#2563eb] h-full rounded-full" style={{ width: '92%' }} />
            </div>
            <span className="text-[11px] text-[#737686] mt-1 block">16h 42m active screen-on</span>
          </div>

          <div className="p-3 bg-[#f2f3ff] rounded-xl border border-[#c3c6d7]/30">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-xs md:text-sm text-[#131b2e]">Performance</span>
              <span className="font-mono-code font-bold text-[#004ac6] text-xs">9.8 / 10</span>
            </div>
            <div className="w-full bg-[#c3c6d7]/40 h-2 rounded-full overflow-hidden">
              <div className="bg-[#2563eb] h-full rounded-full" style={{ width: '98%' }} />
            </div>
            <span className="text-[11px] text-[#737686] mt-1 block">Zero thermal throttling</span>
          </div>

          <div className="p-3 bg-[#f2f3ff] rounded-xl border border-[#c3c6d7]/30">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-xs md:text-sm text-[#131b2e]">Value</span>
              <span className="font-mono-code font-bold text-[#1d4ed8] text-xs">8.9 / 10</span>
            </div>
            <div className="w-full bg-[#c3c6d7]/40 h-2 rounded-full overflow-hidden">
              <div className="bg-[#4069f2] h-full rounded-full" style={{ width: '89%' }} />
            </div>
            <span className="text-[11px] text-[#737686] mt-1 block">Premium pricing tier</span>
          </div>
        </div>

        {/* Pros and Cons Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pros */}
          <div className="border border-emerald-200 bg-emerald-50/40 rounded-xl p-4">
            <h4 className="font-manrope text-sm font-bold text-[#006329] flex items-center gap-1.5 mb-2.5">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              The Pros
            </h4>
            <ul className="space-y-1.5 text-xs text-[#131b2e]">
              <li className="flex items-start gap-2">
                <span className="text-[#006329] font-bold">✓</span>
                Industry-best anti-reflective display coating with stellar outdoor visibility
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#006329] font-bold">✓</span>
                Snapdragon 8 Elite yields exceptional sustained frame rates in AAA mobile titles
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#006329] font-bold">✓</span>
                Versatile 200MP sensor with updated portrait clarity and faster shutter speed
              </li>
            </ul>
          </div>

          {/* Cons */}
          <div className="border border-red-200 bg-red-50/40 rounded-xl p-4">
            <h4 className="font-manrope text-sm font-bold text-[#ba1a1a] flex items-center gap-1.5 mb-2.5">
              <span className="material-symbols-outlined text-[20px]">cancel</span>
              The Cons
            </h4>
            <ul className="space-y-1.5 text-xs text-[#131b2e]">
              <li className="flex items-start gap-2">
                <span className="text-[#ba1a1a] font-bold">✕</span>
                Wired charging remains capped at 45W while rivals push 100W+
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ba1a1a] font-bold">✕</span>
                Substantial form-factor weight makes one-handed usage fatiguing
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ba1a1a] font-bold">✕</span>
                Premium flagship price tag of ₹1,24,999 limits accessibility
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};
