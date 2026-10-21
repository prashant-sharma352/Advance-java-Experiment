import React, { useState, useEffect } from 'react';
import { Product, ScreenId } from '../types';
import { PRODUCTS } from '../data/mockData';

interface DealsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onAddToCart: (product: Product) => void;
  onOpenPriceAlert: (productName: string, price: number) => void;
  cartCount: number;
}

export const DealsScreen: React.FC<DealsScreenProps> = ({
  onNavigate,
  onAddToCart,
  onOpenPriceAlert,
  cartCount,
}) => {
  const [seconds, setSeconds] = useState(15);
  const [activeDealFilter, setActiveDealFilter] = useState('all');

  // Trade-in Valuation State
  const [tradeBrand, setTradeBrand] = useState('Apple');
  const [tradeCondition, setTradeCondition] = useState('Flawless / Like New');
  const [estimatedValue, setEstimatedValue] = useState(21450);
  const [isCalculated, setIsCalculated] = useState(false);

  // Live seconds ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev <= 0 ? 59 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCalculateExchange = () => {
    let base = 12000;
    if (tradeBrand === 'Apple') base = 21450;
    else if (tradeBrand === 'Samsung') base = 17800;
    else if (tradeBrand === 'OnePlus') base = 13200;
    else base = 15500;

    if (tradeCondition === 'Minor Scratches') base = Math.floor(base * 0.85);
    if (tradeCondition === 'Screen Cracked') base = Math.floor(base * 0.55);

    setEstimatedValue(base);
    setIsCalculated(true);
    setTimeout(() => setIsCalculated(false), 3000);
  };

  const dealProducts = [
    {
      product: PRODUCTS['s24-fe'],
      discount: '28% OFF',
      rating: 4.7,
      category: 'SMARTPHONE',
      subtext: '8GB RAM • 256GB • Mint Green',
      price: 42999,
      origPrice: 59999,
      claimed: 78,
      stockText: 'Only 9 left',
      featureBadge: 'Free 1-Day Delivery',
      featureIcon: 'local_shipping',
    },
    {
      product: PRODUCTS['macbook-air-m2'],
      discount: '18% OFF',
      rating: 4.9,
      category: 'LAPTOP',
      subtext: '8-Core GPU • 8GB • 256GB SSD',
      price: 81990,
      origPrice: 99900,
      claimed: 62,
      stockText: '14 units left',
      featureBadge: 'Apple Care Eligible',
      featureIcon: 'verified',
    },
    {
      product: PRODUCTS['oneplus-nord-ce4'],
      discount: '20% OFF',
      rating: 4.5,
      category: 'SMARTPHONE',
      subtext: '100W SUPERVOOC • 8GB • 128GB',
      price: 19999,
      origPrice: 24999,
      claimed: 91,
      stockText: 'Almost Gone',
      featureBadge: 'All-time Low Price',
      featureIcon: 'price_check',
    },
  ];

  return (
    <div className="max-w-md md:max-w-3xl mx-auto px-4 pt-3 pb-24 space-y-6">
      {/* Top Header Row for Deals View */}
      <div className="flex items-center justify-between py-2 border-b border-[#c3c6d7]/30">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('explore')}
            className="p-1 rounded-full hover:bg-[#eaedff] text-[#131b2e]"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <span className="font-manrope text-xl font-extrabold text-[#131b2e]">
            Apex<span className="text-[#004ac6]">Tech Deals</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('cart')}
            className="relative p-2 rounded-full hover:bg-[#eaedff] text-[#434655]"
          >
            <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#004ac6] text-white text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* HERO PROMO BANNER */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#004ac6] via-[#1d4ed8] to-[#131b2e] p-5 text-white shadow-sm">
        <div className="absolute -right-10 -bottom-10 h-36 w-36 rounded-full bg-[#2563eb]/20 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-0.5 text-xs font-semibold text-white backdrop-blur-xs">
              <span className="material-symbols-outlined text-[16px] text-[#7ffc97] fill">bolt</span>
              FLASH SALE LIVE
            </span>
            <span className="font-mono-code text-xs text-[#dbe1ff] font-semibold">VERIFIED DROP</span>
          </div>

          <div>
            <h1 className="font-manrope text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Daily Tech Deals &amp; Price Crash
            </h1>
            <p className="text-xs text-[#eeefff]/80 mt-1">
              Real-time scraped price drops on flagships and workstation laptops.
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="mt-1 flex items-center justify-between rounded-lg bg-[#283044]/80 p-2.5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-1.5 text-[#dbe1ff]">
              <span className="material-symbols-outlined text-[18px]">timer</span>
              <span className="text-xs text-[#d2d9f4]">Offer window</span>
            </div>
            <div className="flex items-center gap-1 font-mono-code text-xs font-bold tracking-wider text-white">
              <span className="bg-black/60 px-1.5 py-0.5 rounded border border-white/20">04h</span>
              <span>:</span>
              <span className="bg-black/60 px-1.5 py-0.5 rounded border border-white/20">28m</span>
              <span>:</span>
              <span className="bg-black/60 px-1.5 py-0.5 rounded border border-white/20 text-[#7ffc97]">
                {seconds < 10 ? `0${seconds}` : seconds}s
              </span>
            </div>
          </div>

          {/* Bank Offer Badge */}
          <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 border border-white/20 backdrop-blur-xs">
            <span className="material-symbols-outlined text-[#7ffc97] text-[20px]">credit_card</span>
            <span className="text-xs text-white font-medium">
              Extra 10% Instant Discount on HDFC &amp; ICICI Cards
            </span>
          </div>
        </div>
      </section>

      {/* HORIZONTAL FILTER CHIPS */}
      <section className="-mx-4 px-4 overflow-x-auto no-scrollbar flex items-center gap-2 pb-1">
        {[
          { id: 'all', label: 'All Deals' },
          { id: 'under20k', label: 'Phones under ₹20k' },
          { id: 'under30k', label: 'Phones under ₹30k' },
          { id: 'laptop50k', label: 'Laptops under ₹50k' },
          { id: 'gaming', label: 'Gaming Laptops' },
          { id: 'clearance', label: 'Clearance Sale' },
        ].map((chip) => (
          <button
            key={chip.id}
            onClick={() => setActiveDealFilter(chip.id)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
              activeDealFilter === chip.id
                ? 'bg-[#2563eb] text-white shadow-xs'
                : 'bg-white border border-[#c3c6d7]/60 text-[#131b2e] hover:bg-[#f2f3ff]'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </section>

      {/* SECTION 1: LIGHTNING DEALS */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#007f36] text-white font-bold">
              <span className="material-symbols-outlined text-[16px]">flash_on</span>
            </span>
            <h2 className="font-manrope text-lg font-bold text-[#131b2e]">
              Lightning Deals
            </h2>
          </div>
          <span className="text-xs text-[#004ac6] font-semibold flex items-center cursor-pointer hover:underline">
            View All <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </span>
        </div>

        {/* Lightning Deal Cards Grid */}
        <div className="grid grid-cols-1 gap-4">
          {dealProducts.map((item, idx) => (
            <article
              key={idx}
              className="bg-white rounded-xl border border-[#c3c6d7]/50 p-4 shadow-xs transition-all duration-200 hover:shadow-md hover:border-[#2563eb]"
            >
              <div className="flex gap-4">
                <div className="relative w-28 h-32 shrink-0 bg-[#f2f3ff] rounded-lg p-2 overflow-hidden flex items-center justify-center border border-[#c3c6d7]/30">
                  <span className="absolute top-1 left-1 rounded bg-[#ba1a1a] px-1.5 py-0.5 font-mono-code text-[10px] font-bold text-white uppercase tracking-wider">
                    {item.discount}
                  </span>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono-code text-[11px] text-[#004ac6] font-semibold uppercase tracking-wider">
                        {item.category}
                      </span>
                      <span className="text-[#c3c6d7]">•</span>
                      <span className="flex items-center text-amber-500 font-mono-code text-[11px] font-bold">
                        ★ {item.rating}
                      </span>
                    </div>

                    <h3 className="font-manrope text-sm font-bold text-[#131b2e] truncate mt-0.5">
                      {item.product.name}
                    </h3>
                    <p className="font-mono-code text-xs text-[#434655] truncate">
                      {item.subtext}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-manrope text-base md:text-lg font-extrabold text-[#131b2e]">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-[#737686] line-through">
                        ₹{item.origPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Stock Progress Bar */}
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between items-center font-mono-code text-[11px]">
                        <span className="text-[#ba1a1a] font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">local_fire_department</span>
                          {item.claimed}% Claimed
                        </span>
                        <span className="text-[#434655]">{item.stockText}</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#eaedff] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-[#ba1a1a] rounded-full transition-all duration-300"
                          style={{ width: `${item.claimed}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#c3c6d7]/30 flex items-center justify-between">
                <span className="text-xs text-[#006329] font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">{item.featureIcon}</span>
                  {item.featureBadge}
                </span>

                <button
                  onClick={() => onAddToCart(item.product)}
                  className="bg-[#131b2e] text-white hover:bg-[#004ac6] px-4 py-1.5 rounded-lg text-xs font-bold transition-colors active:scale-95 shadow-xs"
                >
                  Claim Deal
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 2: PRICE DROP ALERTS & HISTORICAL GRAPH */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#dce1ff] text-[#001551] font-bold">
              <span className="material-symbols-outlined text-[16px]">trending_down</span>
            </span>
            <h2 className="font-manrope text-lg font-bold text-[#131b2e]">
              Price Drop Alerts
            </h2>
          </div>
          <span className="rounded bg-[#e2e7ff] px-2 py-0.5 font-mono-code text-[11px] text-[#004ac6] font-semibold">
            30-DAY INDEX
          </span>
        </div>

        <div className="bg-white rounded-xl border border-[#c3c6d7]/50 p-4 shadow-xs space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-[#007f36]" />
                <span className="font-mono-code text-[11px] text-[#434655] uppercase font-semibold">
                  Lowest recorded price
                </span>
              </div>
              <h3 className="font-manrope text-sm font-bold text-[#131b2e] mt-1">
                Market Price Trajectory
              </h3>
              <p className="text-xs text-[#737686]">
                Tracked across Amazon, Flipkart &amp; Brand Stores
              </p>
            </div>
            <div className="text-right">
              <span className="font-manrope text-lg font-extrabold text-[#006329]">-₹17,000</span>
              <p className="text-xs text-[#737686]">Max Drop</p>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="relative w-full h-32 pt-2">
            <svg
              className="w-full h-full overflow-visible"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 340 100"
            >
              <line stroke="#e2e8f0" strokeDasharray="3 3" x1="0" x2="340" y1="20" y2="20" />
              <line stroke="#e2e8f0" strokeDasharray="3 3" x1="0" x2="340" y1="55" y2="55" />
              <line stroke="#e2e8f0" strokeDasharray="3 3" x1="0" x2="340" y1="90" y2="90" />
              <path
                d="M 0,25 L 50,28 L 100,24 L 150,42 L 200,38 L 250,68 L 300,62 L 340,90 L 340,100 L 0,100 Z"
                fill="url(#blue-gradient)"
                opacity="0.25"
              />
              <path
                d="M 0,25 Q 40,28 75,26 T 150,42 T 230,48 T 285,65 T 340,90"
                stroke="#004ac6"
                strokeLinecap="round"
                strokeWidth="2.5"
              />
              <circle cx="0" cy="25" fill="#004ac6" r="3.5" />
              <circle cx="150" cy="42" fill="#004ac6" r="3.5" />
              <circle cx="285" cy="65" fill="#004ac6" r="3.5" />
              <circle cx="340" cy="90" fill="#007f36" r="4.5" stroke="#ffffff" strokeWidth="2" />
              <defs>
                <linearGradient id="blue-gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#004ac6" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex justify-between items-center font-mono-code text-[11px] text-[#737686] pt-1 border-t border-[#c3c6d7]/30">
            <span>Day 1 (₹59,999)</span>
            <span>Day 15</span>
            <span className="text-[#006329] font-bold">Today (₹42,999 All-time Low)</span>
          </div>

          {/* Alert Notification Bar */}
          <div className="flex items-center justify-between rounded-lg bg-[#f2f3ff] p-3 border border-[#c3c6d7]/40">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#004ac6] text-[20px]">
                notifications_active
              </span>
              <div>
                <p className="text-xs font-bold text-[#131b2e]">Target Price Alert</p>
                <p className="text-[11px] text-[#737686]">Notify when MacBook Air hits ₹79k</p>
              </div>
            </div>
            <button
              onClick={() => onOpenPriceAlert('MacBook Air M2', 81990)}
              className="bg-white border border-[#c3c6d7] px-3 py-1 rounded text-[#004ac6] text-xs font-semibold hover:bg-[#004ac6] hover:text-white transition-colors active:scale-95 shadow-xs"
            >
              Set Alert
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: EXCHANGE & UPGRADE BONUS CALCULATOR */}
      <section className="rounded-xl border border-[#c3c6d7]/50 bg-white p-4 shadow-xs relative overflow-hidden">
        <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[#dce1ff]/50 blur-xl pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-[#dbe1ff] flex items-center justify-center text-[#004ac6] shrink-0">
            <span className="material-symbols-outlined text-[28px]">currency_exchange</span>
          </div>
          <div className="space-y-1">
            <span className="rounded bg-[#62df7d]/30 text-[#005320] px-1.5 py-0.5 font-mono-code text-[10px] font-bold uppercase">
              Limited Period
            </span>
            <h3 className="font-manrope text-base font-bold text-[#131b2e] leading-tight">
              Exchange &amp; Upgrade Bonus
            </h3>
            <p className="text-xs text-[#434655]">
              Trade-in your old smartphone or laptop for up to <strong className="text-[#131b2e] font-semibold">₹15,000 extra</strong> instant valuation boost.
            </p>
          </div>
        </div>

        {/* Quick Interactive Valuation Input */}
        <div className="mt-4 space-y-3 rounded-lg bg-[#faf8ff] p-3 border border-[#c3c6d7]/40">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#434655]">Device Brand</label>
              <select
                value={tradeBrand}
                onChange={(e) => setTradeBrand(e.target.value)}
                className="w-full rounded bg-white border border-[#c3c6d7]/60 py-1.5 px-2 text-xs text-[#131b2e] focus:border-[#2563eb]"
              >
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="OnePlus">OnePlus</option>
                <option value="Dell / HP">Dell / HP</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#434655]">Current Condition</label>
              <select
                value={tradeCondition}
                onChange={(e) => setTradeCondition(e.target.value)}
                className="w-full rounded bg-white border border-[#c3c6d7]/60 py-1.5 px-2 text-xs text-[#131b2e] focus:border-[#2563eb]"
              >
                <option value="Flawless / Like New">Flawless / Like New</option>
                <option value="Minor Scratches">Minor Scratches</option>
                <option value="Screen Cracked">Screen Cracked</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="font-mono-code text-[10px] text-[#737686]">ESTIMATED EXCHANGE VALUE</span>
              <div className="font-manrope text-base font-bold text-[#006329]">
                ₹{estimatedValue.toLocaleString('en-IN')}{' '}
                <span className="font-mono-code text-xs text-[#004ac6] font-semibold">
                  (incl. ₹4,000 bonus)
                </span>
              </div>
            </div>
            <button
              onClick={handleCalculateExchange}
              className="bg-[#004ac6] text-white hover:bg-[#1d4ed8] px-4 py-2 rounded-lg text-xs font-bold transition-transform active:scale-95 shadow-xs"
            >
              {isCalculated ? 'Updated ✓' : 'Calculate'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
