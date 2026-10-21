import React, { useState } from 'react';
import { ScreenId, CartItem } from '../types';

interface CartScreenProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onNavigate: (screen: ScreenId) => void;
  appliedPromo: string | null;
  onApplyPromo: (code: string) => boolean;
  onRemovePromo: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  // Calculations
  const itemsTotal = cartItems.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0
  );

  const discountAmount = appliedPromo ? 5000 : 0;
  const isFreeDelivery = itemsTotal >= 250000;
  const freeDeliveryThreshold = 250900;
  const diffToFree = Math.max(0, freeDeliveryThreshold - itemsTotal);
  const deliveryProgress = Math.min(100, Math.round((itemsTotal / freeDeliveryThreshold) * 100));

  const totalPayable = Math.max(0, itemsTotal - discountAmount);
  const totalSavings = (appliedPromo ? 5000 : 0) + 9101; // Base catalog discount savings

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyPromo(promoInput.trim().toUpperCase());
    if (success) {
      setPromoMessage('Coupon applied successfully!');
      setPromoInput('');
    } else {
      setPromoMessage('Invalid coupon code. Try TECHBONUS5K or APEXPRO.');
    }
    setTimeout(() => setPromoMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] pb-32">
      {/* Top App Bar */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-xs border-b border-[#c3c6d7]/30">
        <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-7xl mx-auto h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('explore')}
              aria-label="Go Back"
              className="p-2 rounded-lg hover:bg-[#eaedff] text-[#131b2e] transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <div className="flex items-center gap-2">
              <h1 className="font-manrope text-lg font-bold text-[#131b2e] tracking-tight">
                Shopping Cart
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#eaedff] text-[#004ac6] text-xs font-semibold">
                {cartItems.length} Items
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('wishlist')}
              className="p-2 rounded-lg hover:bg-[#eaedff] text-[#434655] hover:text-[#004ac6]"
            >
              <span className="material-symbols-outlined text-[22px]">favorite</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-4 space-y-6">
        {/* Free Shipping Progress Bay */}
        <div className="bg-white border border-[#c3c6d7]/40 rounded-xl p-4 md:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5">
            <div className="flex items-center gap-2 text-[#131b2e] text-xs md:text-sm">
              <span className="material-symbols-outlined text-[#007f36]">local_shipping</span>
              {diffToFree > 0 ? (
                <span>
                  Add <strong className="text-[#004ac6]">₹{diffToFree.toLocaleString('en-IN')}</strong> more for{' '}
                  <strong className="text-[#007f36]">Free Express Delivery</strong>
                </span>
              ) : (
                <span className="text-[#007f36] font-bold">
                  ✓ Qualified for Free Express Priority Air Delivery!
                </span>
              )}
            </div>
            <span className="font-mono-code text-xs text-[#434655] font-medium">
              ₹{itemsTotal.toLocaleString('en-IN')} / ₹{freeDeliveryThreshold.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="w-full h-2.5 bg-[#eaedff] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#2563eb] to-[#007f36] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${deliveryProgress}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-2 text-[#434655] text-xs">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#007f36]" /> Express Dispatch Ready
            </span>
            <span>Eligible for priority logistics</span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-[#c3c6d7] p-12 text-center">
            <span className="material-symbols-outlined text-5xl text-[#737686]">shopping_cart</span>
            <h3 className="font-manrope text-lg font-bold text-[#131b2e] mt-2">
              Your cart is empty
            </h3>
            <p className="text-xs text-[#737686] mt-1">
              Explore lab-tested flagships and workstation laptops.
            </p>
            <button
              onClick={() => onNavigate('explore')}
              className="mt-4 px-6 py-2.5 bg-[#004ac6] text-white text-xs font-bold rounded-lg shadow-xs hover:bg-[#1d4ed8]"
            >
              Explore Tech Hub
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Items & Promo (8 Cols) */}
            <section className="lg:col-span-8 space-y-4">
              {/* Cart Items Box */}
              <div className="bg-white border border-[#c3c6d7]/40 rounded-xl shadow-xs overflow-hidden">
                <div className="px-4 py-2.5 border-b border-[#c3c6d7]/30 flex justify-between items-center bg-[#f2f3ff]/50">
                  <span className="text-xs font-bold text-[#131b2e]">
                    Order Items ({cartItems.length})
                  </span>
                  <span className="font-mono-code text-xs text-[#006329] flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[16px]">verified</span> Price Protection Active
                  </span>
                </div>

                {cartItems.map((item) => (
                  <article
                    key={item.id}
                    className="p-4 border-b border-[#c3c6d7]/20 flex flex-col sm:flex-row gap-4 items-start last:border-b-0"
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-lg bg-[#f2f3ff] border border-[#c3c6d7]/30 overflow-hidden flex items-center justify-center p-2 relative">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="object-contain w-full h-full mix-blend-multiply"
                        referrerPolicy="no-referrer"
                      />
                      {item.product.discountPercent && (
                        <span className="absolute top-1 left-1 bg-[#006329] text-white px-1.5 py-0.5 rounded text-[10px] font-mono-code font-bold">
                          {item.product.discountPercent}% OFF
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 w-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-xs text-[#004ac6] font-semibold uppercase font-mono-code">
                              {item.product.category}
                            </span>
                            <h2 className="font-manrope text-sm font-bold text-[#131b2e] truncate">
                              {item.product.name}
                            </h2>
                          </div>
                          <div className="text-right">
                            <div className="font-manrope text-base font-bold text-[#131b2e]">
                              ₹{item.product.price.toLocaleString('en-IN')}
                            </div>
                            <div className="text-xs line-through text-[#737686]">
                              ₹{item.product.originalPrice.toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-[#434655] mt-1">
                          {item.selectedColor || 'Phantom Titanium'} · {item.selectedStorage || '256GB Storage'}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#eaedff] text-[#131b2e] text-[11px] font-semibold">
                            <span className="material-symbols-outlined text-[#007f36] text-[14px]">check_circle</span>
                            In Stock
                          </span>
                          <span className="font-mono-code text-[11px] text-[#434655]">
                            Ships tomorrow
                          </span>
                        </div>
                      </div>

                      {/* Controls & Actions */}
                      <div className="mt-4 pt-3 border-t border-[#c3c6d7]/20 flex flex-wrap items-center justify-between gap-2">
                        {/* Stepper */}
                        <div className="inline-flex items-center border border-[#c3c6d7] rounded-lg bg-white overflow-hidden shadow-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-[#131b2e] hover:bg-[#eaedff] active:scale-95"
                          >
                            <span className="material-symbols-outlined text-[16px]">remove</span>
                          </button>
                          <span className="w-8 text-center font-mono-code text-xs font-bold text-[#131b2e]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#131b2e] hover:bg-[#eaedff] active:scale-95"
                          >
                            <span className="material-symbols-outlined text-[16px]">add</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              onRemoveItem(item.id);
                              onNavigate('wishlist');
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[#434655] hover:text-[#004ac6] text-xs rounded hover:bg-[#f2f3ff]"
                          >
                            <span className="material-symbols-outlined text-[16px]">bookmark_border</span>
                            Save for Later
                          </button>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[#ba1a1a] hover:bg-red-50 text-xs rounded"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Coupon / Promo Card */}
              <div className="bg-white border border-[#c3c6d7]/40 rounded-xl p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-manrope text-sm font-bold text-[#131b2e] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#004ac6]">sell</span>
                    Offers &amp; Promo Coupons
                  </h3>
                  <button
                    onClick={() => {
                      onApplyPromo('TECHBONUS5K');
                    }}
                    className="font-mono-code text-xs text-[#004ac6] hover:underline"
                  >
                    View All (4)
                  </button>
                </div>

                <form onSubmit={handleApply} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="ENTER DISCOUNT OR STUDENT PROMO CODE"
                    className="flex-1 rounded-lg border border-[#c3c6d7] px-3.5 py-2 font-mono-code text-xs text-[#131b2e] placeholder:text-[#737686] focus:border-[#2563eb] uppercase outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#131b2e] hover:bg-[#004ac6] text-white rounded-lg text-xs font-bold transition-colors active:scale-95"
                  >
                    Apply
                  </button>
                </form>

                {promoMessage && (
                  <p className="text-xs font-semibold text-[#004ac6]">{promoMessage}</p>
                )}

                {/* Applied coupon pill */}
                {appliedPromo && (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#eaedff] border border-[#2563eb]/20">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#007f36]">check_circle</span>
                      <div>
                        <p className="font-mono-code text-xs font-bold text-[#131b2e]">
                          {appliedPromo} applied (-₹5,000)
                        </p>
                        <p className="text-[11px] text-[#434655]">
                          Flagship Device Launch Bonus
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onRemovePromo}
                      className="text-xs text-[#ba1a1a] hover:underline px-2 py-1 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Trust Badges Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 bg-[#f2f3ff]/70 border border-[#c3c6d7]/30 rounded-xl text-xs">
                <div className="flex items-center gap-2 text-[#131b2e]">
                  <span className="material-symbols-outlined text-[#007f36]">published_with_changes</span>
                  <span>7-Day Replacement Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-[#131b2e]">
                  <span className="material-symbols-outlined text-[#004ac6]">verified_user</span>
                  <span>100% Genuine Tech Warranty</span>
                </div>
                <div className="flex items-center gap-2 text-[#131b2e]">
                  <span className="material-symbols-outlined text-[#131b2e]">lock</span>
                  <span>Secure 256-Bit Checkout</span>
                </div>
              </div>
            </section>

            {/* Right Column: Order Summary (4 Cols) */}
            <aside className="lg:col-span-4 sticky top-24 space-y-4">
              <div className="bg-white border border-[#c3c6d7]/40 rounded-xl p-4 md:p-5 shadow-xs">
                <h2 className="font-manrope text-base font-bold text-[#131b2e] pb-3 border-b border-[#c3c6d7]/30 mb-3">
                  Order Summary
                </h2>

                <div className="space-y-2.5 text-xs md:text-sm">
                  <div className="flex justify-between items-center text-[#434655]">
                    <span>Items Total ({cartItems.length})</span>
                    <span className="font-mono-code font-semibold text-[#131b2e]">
                      ₹{itemsTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {appliedPromo && (
                    <div className="flex justify-between items-center text-[#006329]">
                      <span className="flex items-center gap-1">
                        Instant Tech Discount
                        <span className="material-symbols-outlined text-[15px]">info</span>
                      </span>
                      <span className="font-mono-code font-bold">-₹5,000</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-[#434655]">
                    <span>Delivery (Express Courier)</span>
                    <span className="font-mono-code text-[#006329] font-bold">FREE</span>
                  </div>

                  <div className="flex justify-between items-center text-[#737686] text-xs">
                    <span>Estimated GST (18% included)</span>
                    <span className="font-mono-code">
                      ₹{Math.round(totalPayable * 0.18).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-[#c3c6d7]/40 flex justify-between items-baseline">
                    <div>
                      <span className="font-manrope text-sm md:text-base font-bold text-[#131b2e]">
                        Total Payable
                      </span>
                      <p className="text-[11px] text-[#006329]">
                        You save ₹{totalSavings.toLocaleString('en-IN')} on this order
                      </p>
                    </div>
                    <span className="font-manrope text-xl font-extrabold text-[#004ac6] font-mono-code">
                      ₹{totalPayable.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="mt-5 hidden md:block">
                  <button
                    onClick={() => onNavigate('checkout')}
                    className="w-full py-3 bg-[#004ac6] hover:bg-[#1d4ed8] text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.98]"
                  >
                    <span>Proceed to Checkout</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                  <p className="text-center text-[11px] text-[#737686] mt-2 flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">shield</span>
                    ApexTech Encrypted Buyer Protection
                  </p>
                </div>
              </div>

              {/* Supported Payment Options Preview */}
              <div className="bg-[#f2f3ff]/50 border border-[#c3c6d7]/30 rounded-xl p-3 text-center">
                <p className="text-[11px] text-[#434655] mb-2 font-medium">Supported Payment Options</p>
                <div className="flex items-center justify-center gap-2 text-[#434655] font-mono-code text-[11px]">
                  <span className="px-2 py-0.5 bg-white border border-[#c3c6d7]/40 rounded">UPI</span>
                  <span className="px-2 py-0.5 bg-white border border-[#c3c6d7]/40 rounded">Credit Card</span>
                  <span className="px-2 py-0.5 bg-white border border-[#c3c6d7]/40 rounded">EMI (0%)</span>
                  <span className="px-2 py-0.5 bg-white border border-[#c3c6d7]/40 rounded">NetBanking</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      {/* Sticky Bottom Dock for Mobile Checkout */}
      {cartItems.length > 0 && (
        <div className="md:hidden fixed bottom-14 left-0 right-0 z-40 bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] border-t border-[#c3c6d7]/40">
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#434655]">Total Payable</span>
              <span className="font-manrope text-base font-extrabold text-[#131b2e]">
                ₹{totalPayable.toLocaleString('en-IN')}
              </span>
            </div>
            <button
              onClick={() => onNavigate('checkout')}
              className="px-5 py-2.5 bg-[#004ac6] hover:bg-[#1d4ed8] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
            >
              <span>Proceed to Checkout</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
