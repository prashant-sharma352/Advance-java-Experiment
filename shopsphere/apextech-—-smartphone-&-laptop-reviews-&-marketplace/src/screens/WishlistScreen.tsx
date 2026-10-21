import React, { useState } from 'react';
import { Product, ScreenId } from '../types';
import { PRODUCTS } from '../data/mockData';

interface WishlistScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onAddToCart: (product: Product) => void;
  cartCount: number;
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({
  onNavigate,
  onAddToCart,
  cartCount,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'dropped' | 'inStock' | 'laptops' | 'smartphones'>('all');

  const [wishlistItems, setWishlistItems] = useState([
    {
      product: PRODUCTS['s25-ultra'],
      badge: 'Price dropped by ₹8,000',
      badgeClass: 'bg-emerald-50 text-[#006329]',
      badgeIcon: 'trending_down',
      variantText: 'Phantom Titanium • 256GB',
      price: 124999,
      origPrice: 132999,
      reviewsCount: 2410,
      stockStatus: 'In Stock - Express Delivery',
      inStock: true,
      priceDropped: true,
    },
    {
      product: PRODUCTS['macbook-air-m3'],
      badge: 'Lowest Price in 30 Days',
      badgeClass: 'bg-[#dce1ff] text-[#001551]',
      badgeIcon: 'verified',
      variantText: 'Midnight, 16GB / 512GB',
      price: 129900,
      origPrice: 134000,
      reviewsCount: 980,
      stockStatus: 'In Stock',
      inStock: true,
      priceDropped: true,
    },
    {
      product: PRODUCTS['asus-rog-g16'],
      badge: 'Out of Stock - Notify Me',
      badgeClass: 'bg-[#ffdad6] text-[#93000a]',
      badgeIcon: 'error_outline',
      variantText: 'Intel Core Ultra 9 • RTX 4070',
      price: 169990,
      origPrice: 179990,
      reviewsCount: 412,
      stockStatus: 'Replenishing inventory expected in 4 days',
      inStock: false,
      priceDropped: false,
    },
  ]);

  const [notifiedItems, setNotifiedItems] = useState<Record<string, boolean>>({});

  const handleRemove = (productId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleNotifyToggle = (productId: string) => {
    setNotifiedItems((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const filteredItems = wishlistItems.filter((item) => {
    if (activeFilter === 'dropped') return item.priceDropped;
    if (activeFilter === 'inStock') return item.inStock;
    if (activeFilter === 'laptops') return item.product.category === 'laptops';
    if (activeFilter === 'smartphones') return item.product.category === 'smartphones';
    return true;
  });

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#faf8ff] flex flex-col relative pb-28 pt-2 px-4 space-y-4">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md -mx-4 px-4 py-2 border-b border-[#c3c6d7]/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('explore')}
            aria-label="Go back"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#131b2e] hover:bg-[#eaedff] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
          <span className="font-manrope text-lg font-extrabold text-[#131b2e]">
            Apex<span className="text-[#004ac6]">Tech</span>
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: 'My ApexTech Wishlist', url: window.location.href });
              }
            }}
            aria-label="Share wishlist"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#434655] hover:text-[#004ac6] hover:bg-[#eaedff]"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
          <button
            onClick={() => onNavigate('cart')}
            aria-label="Shopping Cart"
            className="relative w-8 h-8 rounded-lg flex items-center justify-center text-[#434655] hover:text-[#004ac6] hover:bg-[#eaedff]"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#004ac6] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Title & Badge */}
      <section className="flex items-baseline justify-between pt-1">
        <div>
          <h1 className="font-manrope text-2xl font-bold text-[#131b2e] tracking-tight">
            My Wishlist
          </h1>
          <p className="text-xs text-[#434655] mt-0.5">
            Track real-time market dips &amp; tech specs
          </p>
        </div>
        <span className="text-xs bg-[#eaedff] text-[#004ac6] font-semibold px-2.5 py-1 rounded-full border border-[#c3c6d7]/30">
          {wishlistItems.length} Items Saved
        </span>
      </section>

      {/* Filter Chips */}
      <section className="overflow-x-auto no-scrollbar -mx-4 px-4 flex items-center gap-2 py-1">
        {[
          { id: 'all', label: 'All Saved' },
          { id: 'dropped', label: 'Price Dropped (2)', hasDot: true },
          { id: 'inStock', label: 'In Stock' },
          { id: 'laptops', label: 'Laptops' },
          { id: 'smartphones', label: 'Smartphones' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id as any)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeFilter === f.id
                ? 'bg-[#2563eb] text-white shadow-xs'
                : 'bg-white border border-[#c3c6d7] text-[#131b2e] hover:border-[#2563eb]'
            }`}
          >
            {f.hasDot && <span className="w-1.5 h-1.5 rounded-full bg-[#007f36]" />}
            <span>{f.label}</span>
          </button>
        ))}
      </section>

      {/* Price Drop Alert Card */}
      <section className="bg-[#f2f3ff] border border-[#dbe1ff] rounded-xl p-3 shadow-xs flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#e2e7ff] text-[#004ac6] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[18px]">notifications_active</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#004ac6] font-bold">Price Drop Alert</span>
            <span className="font-mono-code text-[10px] text-[#434655]">Today</span>
          </div>
          <p className="text-xs text-[#434655] mt-0.5 leading-snug">
            2 saved items dropped in price this week! Total potential savings:{' '}
            <span className="font-semibold text-[#007f36]">₹11,200</span>.
          </p>
        </div>
      </section>

      {/* Wishlist Cards */}
      <section className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-[#c3c6d7] p-6">
            <span className="material-symbols-outlined text-4xl text-[#737686]">favorite_border</span>
            <p className="font-bold text-sm text-[#131b2e] mt-2">No items in this filter</p>
            <button
              onClick={() => setActiveFilter('all')}
              className="mt-3 text-xs text-[#004ac6] font-bold underline"
            >
              Show all saved items
            </button>
          </div>
        ) : (
          filteredItems.map((item) => (
            <article
              key={item.product.id}
              className="bg-white rounded-xl border border-[#c3c6d7]/40 p-4 shadow-xs relative overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              {/* Badge Row */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full ${item.badgeClass}`}
                >
                  <span className="material-symbols-outlined text-[14px]">{item.badgeIcon}</span>
                  {item.badge}
                </span>

                <button
                  onClick={() => handleRemove(item.product.id)}
                  aria-label="Remove item"
                  className="text-[#434655] hover:text-[#ba1a1a] transition-colors p-1"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>

              <div className="flex gap-4">
                {/* Thumbnail */}
                <div className="w-24 h-28 bg-[#f2f3ff] rounded-lg shrink-0 overflow-hidden flex items-center justify-center border border-[#c3c6d7]/30 p-1">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <span className="font-mono-code text-[11px] text-[#434655] uppercase tracking-wider block">
                      {item.variantText}
                    </span>
                    <h3 className="font-manrope text-sm font-bold text-[#131b2e] leading-tight truncate mt-0.5">
                      {item.product.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[16px] text-amber-500 fill">
                      star
                    </span>
                    <span className="text-xs font-bold text-[#131b2e]">{item.product.rating}</span>
                    <span className="text-[11px] text-[#434655]">({item.reviewsCount} reviews)</span>
                  </div>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-manrope text-base font-extrabold text-[#131b2e]">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#434655] line-through">
                      ₹{item.origPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stock Indicator */}
              <div className="mt-3 pt-2.5 border-t border-[#c3c6d7]/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.inStock ? 'bg-[#007f36] animate-pulse' : 'bg-[#737686]'
                    }`}
                  />
                  <span className={item.inStock ? 'text-[#006329] font-semibold' : 'text-[#737686]'}>
                    {item.stockStatus}
                  </span>
                </div>

                <button
                  onClick={() => onNavigate('compare')}
                  className="text-xs text-[#004ac6] flex items-center gap-0.5 hover:underline font-semibold"
                >
                  <span className="material-symbols-outlined text-[14px]">compare_arrows</span>
                  Compare
                </button>
              </div>

              {/* Action Button */}
              <div className="mt-3">
                {item.inStock ? (
                  <button
                    onClick={() => onAddToCart(item.product)}
                    className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs py-2.5 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                    Move to Cart
                  </button>
                ) : (
                  <button
                    onClick={() => handleNotifyToggle(item.product.id)}
                    className="w-full bg-transparent border-2 border-[#004ac6] text-[#004ac6] hover:bg-[#eaedff] text-xs py-2 px-4 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {notifiedItems[item.product.id] ? 'check_circle' : 'notifications'}
                    </span>
                    {notifiedItems[item.product.id] ? 'Notification Set' : 'Notify When Available'}
                  </button>
                )}
              </div>
            </article>
          ))
        )}
      </section>

      {/* Bottom Advice Card */}
      <section className="bg-[#f2f3ff] rounded-xl p-4 border border-[#c3c6d7]/30 text-center mb-6">
        <span className="material-symbols-outlined text-[#004ac6] text-2xl mb-1">balance</span>
        <h4 className="font-manrope text-sm font-bold text-[#131b2e]">Need help choosing?</h4>
        <p className="text-xs text-[#434655] mt-1 mb-3">
          Compare battery health, benchmark scores, and thermal efficiency across all your saved devices side-by-side.
        </p>
        <button
          onClick={() => onNavigate('compare')}
          className="w-full bg-[#283044] text-white text-xs py-2 rounded-lg font-semibold hover:bg-black transition-colors"
        >
          Compare All 5 Items
        </button>
      </section>
    </div>
  );
};
