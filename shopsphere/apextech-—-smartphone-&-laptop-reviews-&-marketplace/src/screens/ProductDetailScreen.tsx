import React, { useState } from 'react';
import { Product, ScreenId } from '../types';
import { PRODUCTS } from '../data/mockData';

interface ProductDetailScreenProps {
  productId?: string;
  onNavigate: (screen: ScreenId) => void;
  onAddToCart: (product: Product, options?: { color?: string; storage?: string }) => void;
  onBuyNow: (product: Product, options?: { color?: string; storage?: string }) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  productId = 's25-ultra',
  onNavigate,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
}) => {
  const product = PRODUCTS[productId] || PRODUCTS['s25-ultra'];

  // Gallery tabs
  const [selectedGalleryTab, setSelectedGalleryTab] = useState<'front' | 'titanium' | 'lens' | 'spen'>('front');
  const [interactiveMode, setInteractiveMode] = useState(false);

  // Configuration options
  const [selectedColor, setSelectedColor] = useState('Phantom Titanium');
  const [selectedStorage, setSelectedStorage] = useState('256 GB');

  // Accordion state
  const [expandedSection, setExpandedSection] = useState<'display' | 'compute' | 'camera' | 'build' | null>('display');

  // Pincode check
  const [pincode, setPincode] = useState('560100');
  const [isPincodeVerified, setIsPincodeVerified] = useState(true);

  // Price calculations based on storage
  const basePrice = product.price;
  const storageAddition = selectedStorage === '512 GB' ? 14000 : selectedStorage === '1 TB' ? 32000 : 0;
  const finalPrice = basePrice + storageAddition;
  const finalOrigPrice = product.originalPrice + storageAddition;

  const colorOptions = [
    { name: 'Phantom Titanium', hex: '#8e96a4' },
    { name: 'Phantom Black', hex: '#1e232a' },
    { name: 'Titanium Gray', hex: '#5b616c' },
    { name: 'Silver Blue', hex: '#b5c8df' },
  ];

  const galleryImages: Record<string, string> = {
    front: product.image,
    titanium: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHFktRKMe5JuJC6DUBJbuQu19RJHcAOtKckblgzqADFxYZjZqKSY4HiW8RZUk7iApd0CeN5CbfL9T7FCLul9Shd2gaw_WG1mKuOmGY3FwZXv0CdIlrrS-b1_p_UBseLyLRd33sIGuyZa_XPSrTiJQe12DdJ5ZYxUHF54Awyk8uMBmQrZ9ZX62_oreXhwrYw16kUlQ5bBmA5SuWPxE3BMv1_hAXPE4VekqtlxhgVWX4KiegbGxIdmt2Vg',
    lens: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOpmxCDAFT-PqkObTcqxYRjPPYSXuQ-PtHwq1wBrYalYqtGqG5Xrefb1RbbmH1d7o_zF_Ja7uaMFYoQA8UkRI3L3LT4vwkEomJaGKzpoYzikaU_RRcJL3anxfswk49bzs0aMhnXbi9xQyIBKkRtYrRKhOMtXELP5ussaLAl3xyifOm1aayMy6-b_LsLkKiyNHZIVVNioLMrrZBjY2RZh2Q5kAIUZa2LlSqA-XDOV0S5-4oUsutdFawmg',
    spen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuzekgt6pfKFTxIkOBYJxdlOTl6Z2re1PLrdeAetLp2Q1nDvbioFglBrWZA_1dz1APjIzkMp012OacxRDXpeoTM-PVUdba_ot_lTlbyjBC7pAMYMvhCCZmoX_UDLOEqsqDEDDsmcxIe5Hf17nJMgJCTyLwRkqvEPQs1_2M58W6VPQ4KipilAUpdoVjb1K_c7UBwCamrcWWALu3J31cV7juwJUUwkMApMvLc5fBt-fNLYJBAnm870jLrg',
  };

  return (
    <div className="max-w-md md:max-w-3xl mx-auto px-4 pt-3 pb-28">
      {/* Top Breadcrumb & Share */}
      <div className="flex items-center justify-between py-2 text-xs text-[#737686]">
        <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
          <button onClick={() => onNavigate('explore')} className="hover:text-[#004ac6]">Home</button>
          <span>&gt;</span>
          <button onClick={() => onNavigate('explore')} className="hover:text-[#004ac6]">Smartphones</button>
          <span>&gt;</span>
          <span className="text-[#131b2e] font-semibold">{product.brand}</span>
          <span>&gt;</span>
          <span className="truncate">{product.name}</span>
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-2">
          <button
            onClick={() => onToggleWishlist(product)}
            className={`p-1.5 rounded-full hover:bg-[#eaedff] ${
              isWishlisted ? 'text-[#ba1a1a]' : 'text-[#434655]'
            }`}
          >
            <span className={`material-symbols-outlined text-[20px] ${isWishlisted ? 'fill' : ''}`}>
              favorite
            </span>
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: product.name, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="p-1.5 rounded-full hover:bg-[#eaedff] text-[#434655]"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
        </div>
      </div>

      {/* Main PDP Card */}
      <div className="bg-white rounded-2xl border border-[#c3c6d7]/50 p-4 md:p-6 shadow-xs space-y-6">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-[#f2f3ff] text-[#004ac6] border border-[#dbe1ff] px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 font-mono-code">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            Apex Certified Specs
          </span>
          <span className="bg-emerald-50 text-[#006329] border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#007f36]" />
            In Stock - Express Dispatch
          </span>
          <span className="bg-red-50 text-[#ba1a1a] border border-red-200 px-2 py-0.5 rounded-full text-xs font-bold">
            7% Off Launch Offer
          </span>
        </div>

        {/* Gallery Box */}
        <div className="space-y-3">
          <div className="relative bg-[#f2f3ff] rounded-2xl p-6 h-64 md:h-80 flex items-center justify-center overflow-hidden border border-[#c3c6d7]/30">
            <img
              src={galleryImages[selectedGalleryTab] || product.image}
              alt={product.name}
              className={`max-h-full object-contain mix-blend-multiply transition-all duration-300 ${
                interactiveMode ? 'scale-110 cursor-zoom-in' : ''
              }`}
              referrerPolicy="no-referrer"
            />
            <button
              onClick={() => setInteractiveMode(!interactiveMode)}
              className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs border border-[#c3c6d7]/60 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#131b2e] shadow-xs flex items-center gap-1.5 hover:bg-white"
            >
              <span className="material-symbols-outlined text-[16px]">
                {interactiveMode ? 'zoom_out' : '360'}
              </span>
              <span>{interactiveMode ? 'Reset View' : 'Interactive View'}</span>
            </button>
          </div>

          {/* Gallery View Selector */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'front', label: 'Front', icon: 'smartphone' },
              { id: 'titanium', label: 'Titanium', icon: 'view_in_ar' },
              { id: 'lens', label: '200MP Lens', icon: 'photo_camera' },
              { id: 'spen', label: 'S-Pen Pro', icon: 'edit' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedGalleryTab(tab.id as any)}
                className={`py-2 px-1 text-center rounded-lg border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                  selectedGalleryTab === tab.id
                    ? 'border-[#2563eb] bg-[#eaedff] text-[#004ac6]'
                    : 'border-[#c3c6d7]/40 bg-white text-[#434655] hover:bg-[#f2f3ff]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Title & Ranking */}
        <div className="space-y-1.5 border-b border-[#c3c6d7]/30 pb-4">
          <span className="font-mono-code text-xs text-[#004ac6] font-bold uppercase tracking-wider">
            2025 FLAGSHIP SERIES
          </span>
          <h1 className="font-manrope text-xl md:text-2xl font-extrabold text-[#131b2e]">
            {product.name} 5G (AI Pro Vision)
          </h1>
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="bg-[#007f36] text-white px-2 py-0.5 rounded font-bold flex items-center gap-1">
              ★ {product.rating}
              <span className="text-[11px] font-normal">({product.reviewsCount} verified)</span>
            </span>
            <span className="text-[#004ac6] font-semibold bg-[#eaedff] px-2 py-0.5 rounded">
              🏆 #1 Flagship Smartphone 2025
            </span>
          </div>
        </div>

        {/* Pricing Box */}
        <div className="space-y-2">
          <div className="flex items-baseline gap-3">
            <span className="font-manrope text-2xl md:text-3xl font-extrabold text-[#131b2e]">
              ₹{finalPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-[#737686] line-through">
              ₹{finalOrigPrice.toLocaleString('en-IN')}
            </span>
            <span className="bg-[#007f36] text-white text-xs font-bold px-2 py-0.5 rounded-full">
              Save ₹{(finalOrigPrice - finalPrice).toLocaleString('en-IN')} (7% OFF)
            </span>
          </div>
          <p className="text-xs text-[#737686]">
            Inclusive of all federal taxes &amp; regulatory import duties
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            <div className="p-2.5 rounded-lg bg-[#f2f3ff] border border-[#dbe1ff] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004ac6]">credit_card</span>
                <div>
                  <p className="font-bold text-[#131b2e]">EMI from ₹5,850/mo</p>
                  <p className="text-[#737686] text-[11px]">No Cost EMI on 14 major banks</p>
                </div>
              </div>
              <span className="text-[#004ac6] font-semibold hover:underline cursor-pointer">Plans</span>
            </div>

            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs">
              <span className="material-symbols-outlined text-[#007f36]">local_offer</span>
              <div>
                <p className="font-bold text-[#007f36]">Instant Bank Discount</p>
                <p className="text-[#434655] text-[11px]">Extra ₹5,000 off on HDFC &amp; ICICI</p>
              </div>
            </div>
          </div>
        </div>

        {/* Color / Finish Selector */}
        <div className="space-y-2 border-t border-[#c3c6d7]/30 pt-4">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-[#131b2e]">Finish / Color:</span>
            <span className="font-mono-code font-semibold text-[#004ac6]">{selectedColor}</span>
          </div>
          <div className="flex items-center gap-3">
            {colorOptions.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={`w-9 h-9 rounded-full border-2 transition-transform duration-150 relative ${
                  selectedColor === c.name
                    ? 'border-[#004ac6] ring-2 ring-[#004ac6]/30 scale-110'
                    : 'border-slate-300'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Storage Capacity Selector */}
        <div className="space-y-2 border-t border-[#c3c6d7]/30 pt-4">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-[#131b2e]">Storage Capacity:</span>
            <span className="font-mono-code text-[11px] text-[#737686]">UFS 4.1 Pro</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { size: '256 GB', extra: 'Selected' },
              { size: '512 GB', extra: '+₹14,000' },
              { size: '1 TB', extra: '+₹32,000' },
            ].map((s) => (
              <button
                key={s.size}
                onClick={() => setSelectedStorage(s.size)}
                className={`py-2 px-2 text-center rounded-lg border text-xs transition-all ${
                  selectedStorage === s.size
                    ? 'border-[#004ac6] bg-[#eaedff] text-[#004ac6] font-bold shadow-xs'
                    : 'border-[#c3c6d7]/50 bg-white text-[#434655] hover:bg-[#f2f3ff]'
                }`}
              >
                <div className="font-bold">{s.size}</div>
                <div className="text-[10px] text-[#737686] font-mono-code mt-0.5">{s.extra}</div>
              </button>
            ))}
          </div>

          <div className="p-2.5 rounded-lg bg-[#f2f3ff] text-xs font-mono-code text-[#434655] flex justify-between">
            <span>Unified Memory:</span>
            <span className="font-bold text-[#131b2e]">12GB LPDDR5X (8533 Mbps)</span>
          </div>
        </div>

        {/* Hardware Highlights Cards (4-Grid) */}
        <div className="border-t border-[#c3c6d7]/30 pt-4 space-y-3">
          <h3 className="font-manrope text-base font-bold text-[#131b2e]">Hardware Highlights</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-[#f2f3ff] rounded-xl border border-[#c3c6d7]/40 space-y-1">
              <span className="material-symbols-outlined text-[#004ac6] text-[20px]">memory</span>
              <span className="font-mono-code text-[10px] text-[#737686] block uppercase">SILICON</span>
              <p className="font-bold text-xs text-[#131b2e]">Snapdragon 8 Elite</p>
              <p className="text-[11px] text-[#737686]">3nm TSMC Oryon Cores</p>
            </div>

            <div className="p-3 bg-[#f2f3ff] rounded-xl border border-[#c3c6d7]/40 space-y-1">
              <span className="material-symbols-outlined text-[#004ac6] text-[20px]">screenshot</span>
              <span className="font-mono-code text-[10px] text-[#737686] block uppercase">DISPLAY</span>
              <p className="font-bold text-xs text-[#131b2e]">6.86" Dynamic AMOLED</p>
              <p className="text-[11px] text-[#737686]">2,600 nits, 1-120Hz LTPO</p>
            </div>

            <div className="p-3 bg-[#f2f3ff] rounded-xl border border-[#c3c6d7]/40 space-y-1">
              <span className="material-symbols-outlined text-[#004ac6] text-[20px]">photo_camera</span>
              <span className="font-mono-code text-[10px] text-[#737686] block uppercase">OPTICS</span>
              <p className="font-bold text-xs text-[#131b2e]">200MP Quad Pro</p>
              <p className="text-[11px] text-[#737686]">5x Periscope + 100x Space AI</p>
            </div>

            <div className="p-3 bg-[#f2f3ff] rounded-xl border border-[#c3c6d7]/40 space-y-1">
              <span className="material-symbols-outlined text-[#004ac6] text-[20px]">battery_charging_full</span>
              <span className="font-mono-code text-[10px] text-[#737686] block uppercase">ENDURANCE</span>
              <p className="font-bold text-xs text-[#131b2e]">5,000 mAh Cells</p>
              <p className="text-[11px] text-[#737686]">45W Fast (68% in 30m)</p>
            </div>
          </div>
        </div>

        {/* Independent Lab Score Breakdown */}
        <div className="border-t border-[#c3c6d7]/30 pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono-code text-xs text-[#004ac6] font-bold uppercase">
                INDEPENDENT LAB TESTING
              </span>
              <h3 className="font-manrope text-base font-bold text-[#131b2e]">
                Hardware Lab Score
              </h3>
            </div>
            <span className="bg-[#007f36] text-white px-3 py-1 rounded-xl font-bold font-manrope text-sm">
              9.4 / 10
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Display &amp; Glare Rejection</span>
                <span className="font-mono-code text-[#004ac6]">9.6 / 10</span>
              </div>
              <div className="w-full bg-[#eaedff] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#2563eb] h-full" style={{ width: '96%' }} />
              </div>
              <span className="text-[11px] text-[#737686]">Corning Gorilla Armor anti-reflective panel</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Battery Active Endurance</span>
                <span className="font-mono-code text-[#004ac6]">9.2 / 10</span>
              </div>
              <div className="w-full bg-[#eaedff] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#2563eb] h-full" style={{ width: '92%' }} />
              </div>
              <span className="text-[11px] text-[#737686]">16h 42m continuous simulated web browsing</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Compute &amp; Sustained Gaming</span>
                <span className="font-mono-code text-[#004ac6]">9.8 / 10</span>
              </div>
              <div className="w-full bg-[#eaedff] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#2563eb] h-full" style={{ width: '98%' }} />
              </div>
              <span className="text-[11px] text-[#737686]">Geekbench 6: 3,180 Single / 10,240 Multi-Core</span>
            </div>
          </div>

          {/* Advantages & Considerations */}
          <div className="space-y-2 pt-2">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5">
              <h4 className="text-xs font-bold text-[#007f36] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Key Advantages
              </h4>
              <ul className="text-xs text-[#131b2e] space-y-1 list-disc pl-4">
                <li>Top-tier anti-reflective display coating eliminates 75% reflections.</li>
                <li>Zero thermal throttling during extended AAA ray-traced gaming sessions.</li>
                <li>Unmatched telephoto zoom clarity with enhanced AI edge synthesis.</li>
              </ul>
            </div>

            <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-1.5">
              <h4 className="text-xs font-bold text-[#ba1a1a] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">cancel</span>
                Critical Considerations
              </h4>
              <ul className="text-xs text-[#131b2e] space-y-1 list-disc pl-4">
                <li>Wired charging capped at 45W (competitors offer 100W+).</li>
                <li>Substantial premium pricing tier for base 256GB storage.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Specifications Accordion */}
        <div className="border-t border-[#c3c6d7]/30 pt-4 space-y-2">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="font-mono-code text-xs text-[#004ac6] font-bold uppercase">FULL ARCHITECTURE</span>
              <h3 className="font-manrope text-base font-bold text-[#131b2e]">
                Technical Specifications
              </h3>
            </div>
            <span className="material-symbols-outlined text-[#737686]">tune</span>
          </div>

          {/* Accordion Item: Display Engine */}
          <div className="border border-[#c3c6d7]/40 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === 'display' ? null : 'display')}
              className="w-full p-3 bg-[#f2f3ff] flex items-center justify-between text-xs font-bold text-[#131b2e]"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#004ac6]">screenshot</span>
                Display Engine
              </span>
              <span className="material-symbols-outlined text-[18px]">
                {expandedSection === 'display' ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {expandedSection === 'display' && (
              <div className="p-3 bg-white text-xs space-y-2 font-mono-code text-[#434655]">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Screen Size &amp; Panel:</span>
                  <span className="font-bold text-[#131b2e]">6.86" Dynamic AMOLED 2X</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Resolution:</span>
                  <span className="font-bold text-[#131b2e]">QHD+ (3120 x 1440), 505 ppi</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Refresh Rate:</span>
                  <span className="font-bold text-[#131b2e]">1Hz - 120Hz LTPO Adaptive</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Peak Luminance:</span>
                  <span className="font-bold text-[#131b2e]">2,600 nits (Outdoor Boost)</span>
                </div>
              </div>
            )}
          </div>

          {/* Accordion Item: Compute */}
          <div className="border border-[#c3c6d7]/40 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === 'compute' ? null : 'compute')}
              className="w-full p-3 bg-[#f2f3ff] flex items-center justify-between text-xs font-bold text-[#131b2e]"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#004ac6]">memory</span>
                Compute &amp; Memory
              </span>
              <span className="material-symbols-outlined text-[18px]">
                {expandedSection === 'compute' ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {expandedSection === 'compute' && (
              <div className="p-3 bg-white text-xs space-y-2 font-mono-code text-[#434655]">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Processor:</span>
                  <span className="font-bold text-[#131b2e]">Qualcomm Snapdragon 8 Elite (3nm)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>RAM:</span>
                  <span className="font-bold text-[#131b2e]">12GB LPDDR5X (8533 Mbps)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Vapor Chamber:</span>
                  <span className="font-bold text-[#131b2e]">1.9x enlarged cryogenic chamber</span>
                </div>
              </div>
            )}
          </div>

          {/* Accordion Item: Camera */}
          <div className="border border-[#c3c6d7]/40 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === 'camera' ? null : 'camera')}
              className="w-full p-3 bg-[#f2f3ff] flex items-center justify-between text-xs font-bold text-[#131b2e]"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#004ac6]">photo_camera</span>
                Camera Matrix
              </span>
              <span className="material-symbols-outlined text-[18px]">
                {expandedSection === 'camera' ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {expandedSection === 'camera' && (
              <div className="p-3 bg-white text-xs space-y-2 font-mono-code text-[#434655]">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Main Sensor:</span>
                  <span className="font-bold text-[#131b2e]">200MP f/1.7 OIS (1/1.3")</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Periscope:</span>
                  <span className="font-bold text-[#131b2e]">50MP 5x Optical, 100x Space Zoom</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Video:</span>
                  <span className="font-bold text-[#131b2e]">8K @ 30fps / 4K @ 120fps</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Delivery & Warranty Check */}
        <div className="border-t border-[#c3c6d7]/30 pt-4 space-y-3">
          <h3 className="font-manrope text-sm font-bold text-[#131b2e]">
            Delivery &amp; Warranty Check
          </h3>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737686] text-[18px]">
                location_on
              </span>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter 6-digit Pincode"
                className="w-full bg-[#f2f3ff] border border-[#c3c6d7] rounded-lg pl-9 pr-3 py-2 text-xs font-mono-code text-[#131b2e] focus:outline-none focus:border-[#2563eb]"
              />
            </div>
            <button
              onClick={() => setIsPincodeVerified(true)}
              className="bg-[#131b2e] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-black"
            >
              Verify
            </button>
          </div>

          {isPincodeVerified && (
            <p className="text-xs text-[#007f36] flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              Delivering to <strong>Bengaluru {pincode}</strong> - Get it <strong>Tomorrow by 2 PM</strong>
            </p>
          )}

          <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
            <div className="p-2 bg-[#f2f3ff] rounded-lg">
              <span className="material-symbols-outlined text-[#004ac6] text-[18px]">published_with_changes</span>
              <p className="font-bold text-[#131b2e] mt-1">7-Day Return</p>
              <p className="text-[10px] text-[#737686]">No-questions replacement</p>
            </div>
            <div className="p-2 bg-[#f2f3ff] rounded-lg">
              <span className="material-symbols-outlined text-[#007f36] text-[18px]">verified</span>
              <p className="font-bold text-[#131b2e] mt-1">1 Year Brand</p>
              <p className="text-[10px] text-[#737686]">Official Samsung care</p>
            </div>
            <div className="p-2 bg-[#f2f3ff] rounded-lg">
              <span className="material-symbols-outlined text-[#2563eb] text-[18px]">local_shipping</span>
              <p className="font-bold text-[#131b2e] mt-1">Free Express</p>
              <p className="text-[10px] text-[#737686]">Insured transit</p>
            </div>
          </div>
        </div>

        {/* Head-to-Head Duel Card */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-[#dbe1ff] to-[#e2e7ff] flex items-center justify-between border border-[#c3c6d7]/30">
          <div>
            <span className="font-mono-code text-[10px] font-bold text-[#004ac6] uppercase">
              HEAD-TO-HEAD DUEL
            </span>
            <h4 className="font-manrope text-sm font-bold text-[#131b2e]">
              Compare with iPhone 16 Pro Max
            </h4>
            <p className="text-[11px] text-[#434655]">
              See side-by-side benchmark scores, camera tests, and thermal specs.
            </p>
          </div>
          <button
            onClick={() => onNavigate('compare')}
            className="w-9 h-9 rounded-full bg-[#004ac6] text-white flex items-center justify-center shrink-0 hover:bg-[#1d4ed8]"
          >
            <span className="material-symbols-outlined text-[20px]">compare_arrows</span>
          </button>
        </div>
      </div>

      {/* Sticky Bottom Buying Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#c3c6d7]/40 p-3 shadow-lg max-w-lg md:max-w-3xl mx-auto">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-[#737686] uppercase block font-mono-code">CURRENT OFFER</span>
            <div className="flex items-baseline gap-1">
              <span className="font-manrope text-lg font-extrabold text-[#131b2e]">
                ₹{finalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-[#007f36] font-semibold">Save ₹9,001</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onAddToCart(product, { color: selectedColor, storage: selectedStorage })}
              className="px-4 py-2.5 rounded-lg border border-[#004ac6] text-[#004ac6] hover:bg-[#eaedff] font-semibold text-xs transition-colors flex items-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
              Add
            </button>
            <button
              onClick={() => onBuyNow(product, { color: selectedColor, storage: selectedStorage })}
              className="px-6 py-2.5 rounded-lg bg-[#004ac6] hover:bg-[#1d4ed8] text-white font-bold text-xs shadow-xs transition-all active:scale-95"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
