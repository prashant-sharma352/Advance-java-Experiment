import React, { useState } from 'react';
import { ScreenId, Product } from '../types';
import { PRODUCTS } from '../data/mockData';

interface CompareScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onAddToCart: (product: Product) => void;
  onOpenPdfExport: () => void;
}

export const CompareScreen: React.FC<CompareScreenProps> = ({
  onNavigate,
  onAddToCart,
  onOpenPdfExport,
}) => {
  const [category, setCategory] = useState<'smartphones' | 'laptops'>('smartphones');
  const [highlightDifferences, setHighlightDifferences] = useState(true);

  // Contenders state
  const [contenderAKey, setContenderAKey] = useState<string>('s25-ultra');
  const [contenderBKey, setContenderBKey] = useState<string>('iphone-16-pro-max');

  const contenderA = PRODUCTS[contenderAKey] || PRODUCTS['s25-ultra'];
  const contenderB = PRODUCTS[contenderBKey] || PRODUCTS['iphone-16-pro-max'];

  const handleSwapToLaptops = () => {
    setCategory('laptops');
    setContenderAKey('macbook-air-m3');
    setContenderBKey('asus-rog-g16');
  };

  const handleSwapToSmartphones = () => {
    setCategory('smartphones');
    setContenderAKey('s25-ultra');
    setContenderBKey('iphone-16-pro-max');
  };

  return (
    <main className="w-full max-w-lg md:max-w-4xl mx-auto px-4 pt-4 pb-24">
      {/* Title and Subtitle */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 text-[#004ac6] mb-1">
          <span className="material-symbols-outlined text-sm">compare_arrows</span>
          <span className="font-mono-code text-xs uppercase tracking-wider text-[#004ac6] font-bold">
            Hardware Benchmarks
          </span>
        </div>
        <h1 className="font-manrope text-2xl md:text-3xl font-extrabold text-[#131b2e]">
          Device Comparison Engine
        </h1>
        <p className="text-xs md:text-sm text-[#434655] mt-1">
          Side-by-side technical evaluation with lab-tested scores.
        </p>
      </div>

      {/* Category Switcher Pill Tabs */}
      <div className="bg-[#e2e7ff] p-1 rounded-xl flex items-center mb-4 shadow-inner">
        <button
          onClick={handleSwapToSmartphones}
          className={`flex-1 py-1.5 text-center rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
            category === 'smartphones'
              ? 'bg-white text-[#004ac6] shadow-sm'
              : 'text-[#434655] hover:text-[#131b2e]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">smartphone</span>
          Smartphones
        </button>
        <button
          onClick={handleSwapToLaptops}
          className={`flex-1 py-1.5 text-center rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
            category === 'laptops'
              ? 'bg-white text-[#004ac6] shadow-sm'
              : 'text-[#434655] hover:text-[#131b2e]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">laptop_mac</span>
          Laptops
        </button>
      </div>

      {/* Contender Selection Pills Scroll Area */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 mb-4">
        <div className="flex items-center gap-1.5 bg-white border border-[#2563eb]/40 px-3 py-1.5 rounded-full shadow-xs shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#2563eb]" />
          <span className="text-xs font-semibold text-[#131b2e]">{contenderA.name}</span>
        </div>

        <div className="flex items-center gap-1.5 bg-white border border-[#c3c6d7]/60 px-3 py-1.5 rounded-full shadow-xs shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#1d4ed8]" />
          <span className="text-xs font-semibold text-[#131b2e]">{contenderB.name}</span>
        </div>

        <button
          onClick={() => {
            if (category === 'smartphones') {
              setContenderBKey(contenderBKey === 'iphone-16-pro-max' ? 'oneplus-nord-4' : 'iphone-16-pro-max');
            } else {
              setContenderBKey(contenderBKey === 'asus-rog-g16' ? 'dell-xps-13-plus' : 'asus-rog-g16');
            }
          }}
          className="flex items-center gap-1 bg-[#f2f3ff] border border-dashed border-[#c3c6d7] hover:border-[#004ac6] px-3 py-1.5 rounded-full text-[#004ac6] text-xs font-semibold shrink-0 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
          <span>Swap Contender B</span>
        </button>
      </div>

      {/* Toolbar: Highlight Differences & Winner Badges */}
      <div className="flex items-center justify-between bg-white border border-[#c3c6d7]/50 rounded-xl p-3 mb-6 shadow-xs">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <div className="relative inline-flex items-center">
            <input
              type="checkbox"
              checked={highlightDifferences}
              onChange={(e) => setHighlightDifferences(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-[#c3c6d7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2563eb]" />
          </div>
          <span className="text-xs font-semibold text-[#131b2e]">Highlight Differences</span>
        </label>

        <div className="flex items-center gap-1 bg-[#f2f3ff] border border-[#c3c6d7]/40 px-2.5 py-1 rounded-full text-[#006329]">
          <span className="material-symbols-outlined text-[15px]">military_tech</span>
          <span className="text-xs font-semibold">Winner Badges</span>
        </div>
      </div>

      {/* Visual Comparison Cards Grid (Header Bay) */}
      <div className="grid grid-cols-2 gap-3 md:gap-6 mb-6">
        {/* Contender 1 Card */}
        <div className="bg-white border border-[#c3c6d7]/60 rounded-xl p-3 md:p-4 flex flex-col justify-between shadow-xs relative overflow-hidden">
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-[#004ac6] text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
              Device 1
            </span>
          </div>
          <div className="w-full aspect-[4/3] bg-[#f2f3ff] rounded-lg mb-2 flex items-center justify-center p-2 relative overflow-hidden">
            <img
              src={contenderA.image}
              alt={contenderA.name}
              className="object-contain h-full w-full mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="font-mono-code text-[11px] text-[#737686] uppercase tracking-wider">
              {contenderA.brand}
            </span>
            <h2 className="font-manrope text-sm md:text-base font-bold text-[#131b2e] line-clamp-1 leading-tight">
              {contenderA.name}
            </h2>
            <div className="flex items-baseline gap-1 my-1.5">
              <span className="font-manrope text-base md:text-lg font-bold text-[#131b2e]">
                ₹{contenderA.price.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <div className="flex items-center bg-[#007f36] text-white px-1.5 py-0.5 rounded text-[11px] font-bold">
                <span>{contenderA.labScore}</span>
                <span className="material-symbols-outlined text-[12px] ml-0.5 fill">star</span>
              </div>
              <span className="text-[11px] text-[#737686]">
                ({contenderA.reviewsCount.toLocaleString()} labs)
              </span>
            </div>
            <button
              onClick={() => onAddToCart(contenderA)}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-2 px-2 rounded-lg text-xs font-semibold transition-colors active:scale-95 text-center shadow-xs"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Contender 2 Card */}
        <div className="bg-white border border-[#c3c6d7]/60 rounded-xl p-3 md:p-4 flex flex-col justify-between shadow-xs relative overflow-hidden">
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-[#d2d9f4] text-[#131b2e] text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
              Device 2
            </span>
          </div>
          <div className="w-full aspect-[4/3] bg-[#f2f3ff] rounded-lg mb-2 flex items-center justify-center p-2 relative overflow-hidden">
            <img
              src={contenderB.image}
              alt={contenderB.name}
              className="object-contain h-full w-full mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="font-mono-code text-[11px] text-[#737686] uppercase tracking-wider">
              {contenderB.brand}
            </span>
            <h2 className="font-manrope text-sm md:text-base font-bold text-[#131b2e] line-clamp-1 leading-tight">
              {contenderB.name}
            </h2>
            <div className="flex items-baseline gap-1 my-1.5">
              <span className="font-manrope text-base md:text-lg font-bold text-[#131b2e]">
                ₹{contenderB.price.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <div className="flex items-center bg-[#007f36] text-white px-1.5 py-0.5 rounded text-[11px] font-bold">
                <span>{contenderB.labScore}</span>
                <span className="material-symbols-outlined text-[12px] ml-0.5 fill">star</span>
              </div>
              <span className="text-[11px] text-[#737686]">
                ({contenderB.reviewsCount.toLocaleString()} labs)
              </span>
            </div>
            <button
              onClick={() => onAddToCart(contenderB)}
              className="w-full bg-[#eaedff] hover:bg-[#dbe1ff] text-[#004ac6] py-2 px-2 rounded-lg text-xs font-semibold transition-colors active:scale-95 text-center"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* COMPARISON MATRIX SECTIONS */}
      {/* Category 1: Display & Screen */}
      <div className="mb-4 bg-white border border-[#c3c6d7]/60 rounded-xl overflow-hidden shadow-xs">
        <div className="bg-[#f2f3ff] px-4 py-2.5 border-b border-[#c3c6d7]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[20px]">screenshot</span>
            <span className="font-manrope text-sm font-bold text-[#131b2e]">1. Display &amp; Screen</span>
          </div>
          <span className="text-[11px] bg-emerald-50 text-[#006329] px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
            Galaxy Led
          </span>
        </div>

        <div className="divide-y divide-[#c3c6d7]/30">
          <div className="p-3">
            <div className="text-[11px] text-[#737686] uppercase font-semibold mb-1">
              Screen Size &amp; Tech
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2.5 rounded-lg border border-[#c3c6d7]/40">
                <span className="font-bold text-xs md:text-sm text-[#131b2e] block">
                  6.86" Dynamic AMOLED 2X
                </span>
                <span className="font-mono-code text-[11px] text-[#737686]">
                  3120 x 1440 QHD+
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-[#c3c6d7]/40">
                <span className="font-bold text-xs md:text-sm text-[#131b2e] block">
                  6.9" Super Retina XDR
                </span>
                <span className="font-mono-code text-[11px] text-[#737686]">
                  2868 x 1320 OLED
                </span>
              </div>
            </div>
          </div>

          <div className={`p-3 ${highlightDifferences ? 'bg-[#f2f3ff]/40' : ''}`}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] text-[#737686] uppercase font-semibold">
                Peak Luminance
              </span>
              <span className="text-[10px] font-bold text-[#006329] bg-[#7ffc97]/30 px-1.5 py-0.2 rounded">
                +400 Nits Edge
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2.5 rounded-lg border-2 border-[#007f36] shadow-xs relative">
                <span className="material-symbols-outlined text-[#006329] text-sm absolute top-1.5 right-1.5 fill">
                  check_circle
                </span>
                <span className="font-manrope text-base font-bold text-[#006329] block">
                  2,600 nits
                </span>
                <span className="text-[11px] text-[#737686]">Anti-Reflective Corning Armor</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-[#c3c6d7]/40">
                <span className="font-manrope text-base font-bold text-[#131b2e] block">
                  2,000 nits
                </span>
                <span className="text-[11px] text-[#737686]">Ceramic Shield 2.0 Glass</span>
              </div>
            </div>
          </div>

          <div className="p-3">
            <div className="text-[11px] text-[#737686] uppercase font-semibold mb-1">
              Adaptive Refresh Rate
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2">
                <span className="font-semibold text-xs text-[#131b2e] block">1 - 120Hz LTPO</span>
                <p className="text-[11px] text-[#737686]">Seamless frame pacing</p>
              </div>
              <div className="p-2">
                <span className="font-semibold text-xs text-[#131b2e] block">1 - 120Hz ProMotion</span>
                <p className="text-[11px] text-[#737686]">Motion sync optimized</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category 2: Performance & Benchmarks */}
      <div className="mb-4 bg-white border border-[#c3c6d7]/60 rounded-xl overflow-hidden shadow-xs">
        <div className="bg-[#f2f3ff] px-4 py-2.5 border-b border-[#c3c6d7]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[20px]">memory</span>
            <span className="font-manrope text-sm font-bold text-[#131b2e]">2. Performance &amp; Benchmarks</span>
          </div>
          <span className="text-[11px] bg-[#dce1ff] text-[#001551] px-2 py-0.5 rounded-full font-semibold">
            Tied Power
          </span>
        </div>

        <div className="divide-y divide-[#c3c6d7]/30">
          <div className="p-3">
            <div className="text-[11px] text-[#737686] uppercase font-semibold mb-1">
              Processor Architecture
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2.5 rounded-lg border border-[#c3c6d7]/40">
                <span className="font-bold text-xs text-[#131b2e] block">Snapdragon 8 Elite</span>
                <span className="font-mono-code text-[11px] text-[#737686]">Oryon Cores (3nm TSMC)</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-[#c3c6d7]/40">
                <span className="font-bold text-xs text-[#131b2e] block">Apple A18 Pro</span>
                <span className="font-mono-code text-[11px] text-[#737686]">6-core CPU + 6-core GPU</span>
              </div>
            </div>
          </div>

          <div className={`p-3 ${highlightDifferences ? 'bg-[#f2f3ff]/40' : ''}`}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] text-[#737686] uppercase font-semibold">
                Geekbench 6 (Single / Multi)
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2.5 rounded-lg border border-[#c3c6d7]/40">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono-code text-[11px] text-[#737686]">Single</span>
                  <span className="font-mono-code text-xs font-bold text-[#131b2e]">3,180</span>
                </div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="font-mono-code text-[11px] text-[#737686]">Multi</span>
                  <span className="font-mono-code text-xs font-bold text-[#004ac6]">10,240 (Win)</span>
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-lg border-2 border-[#007f36] relative shadow-xs">
                <span className="material-symbols-outlined text-[#007f36] text-xs absolute top-1 right-1 fill">
                  check_circle
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono-code text-[11px] text-[#737686]">Single</span>
                  <span className="font-mono-code text-xs font-bold text-[#007f36]">3,520 (Win)</span>
                </div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="font-mono-code text-[11px] text-[#737686]">Multi</span>
                  <span className="font-mono-code text-xs font-bold text-[#131b2e]">9,410</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3">
            <div className="text-[11px] text-[#737686] uppercase font-semibold mb-1">
              AnTuTu v10 &amp; Thermal Stability
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 border border-[#c3c6d7]/40 rounded-lg">
                <span className="font-mono-code text-xs text-[#006329] font-bold">
                  2,880,140 pts
                </span>
                <div className="w-full bg-[#eaedff] h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-[#2563eb] h-full w-[88%]" />
                </div>
                <span className="text-[10px] text-[#737686] mt-1 block">82% Thermal Stability</span>
              </div>
              <div className="p-2 border border-[#c3c6d7]/40 rounded-lg">
                <span className="font-mono-code text-xs text-[#131b2e] font-bold">
                  2,140,890 pts
                </span>
                <div className="w-full bg-[#eaedff] h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-[#4069f2] h-full w-[74%]" />
                </div>
                <span className="text-[10px] text-[#737686] mt-1 block">74% Thermal Stability</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category 3: Camera & Optics */}
      <div className="mb-4 bg-white border border-[#c3c6d7]/60 rounded-xl overflow-hidden shadow-xs">
        <div className="bg-[#f2f3ff] px-4 py-2.5 border-b border-[#c3c6d7]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[20px]">photo_camera</span>
            <span className="font-manrope text-sm font-bold text-[#131b2e]">3. Camera &amp; Imaging</span>
          </div>
          <span className="text-[11px] bg-emerald-50 text-[#006329] px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
            DXOMARK 158 vs 159
          </span>
        </div>

        <div className="divide-y divide-[#c3c6d7]/30">
          <div className="p-3">
            <div className="text-[11px] text-[#737686] uppercase font-semibold mb-1">
              Primary Resolution &amp; Sensor
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2.5 rounded-lg border border-[#c3c6d7]/40">
                <span className="font-manrope text-sm font-bold text-[#131b2e] block">200 MP</span>
                <span className="text-[11px] text-[#737686]">f/1.7, 1/1.3", Laser AF, OIS</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-[#c3c6d7]/40">
                <span className="font-manrope text-sm font-bold text-[#131b2e] block">48 MP</span>
                <span className="text-[11px] text-[#737686]">f/1.78, Sensor-shift Gen 2</span>
              </div>
            </div>
          </div>

          <div className="p-3">
            <div className="text-[11px] text-[#737686] uppercase font-semibold mb-1">
              Telephoto Zoom &amp; Video Codecs
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2">
                <span className="font-bold text-xs text-[#131b2e] block">5x Periscope + 3x</span>
                <span className="font-mono-code text-[11px] text-[#004ac6] block mt-0.5">8K Video @ 30fps</span>
                <span className="text-[11px] text-[#737686]">100x Space Zoom AI</span>
              </div>
              <div className="p-2 border-l border-[#c3c6d7]/30">
                <span className="font-bold text-xs text-[#131b2e] block">5x Tetraprism</span>
                <span className="font-mono-code text-[11px] text-[#1d4ed8] block mt-0.5">4K ProRes @ 120fps</span>
                <span className="text-[11px] text-[#737686]">Log Video / Academy ACE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category 4: Battery & Charging */}
      <div className="mb-4 bg-white border border-[#c3c6d7]/60 rounded-xl overflow-hidden shadow-xs">
        <div className="bg-[#f2f3ff] px-4 py-2.5 border-b border-[#c3c6d7]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[20px]">battery_charging_full</span>
            <span className="font-manrope text-sm font-bold text-[#131b2e]">4. Battery &amp; Endurance</span>
          </div>
          <span className="text-[11px] bg-[#7ffc97] text-[#002109] font-bold px-2 py-0.5 rounded-full">
            Galaxy Wins
          </span>
        </div>

        <div className="divide-y divide-[#c3c6d7]/30">
          <div className="p-3">
            <div className="text-[11px] text-[#737686] uppercase font-semibold mb-1">
              Battery Cell &amp; Wired Speed
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2.5 rounded-lg border-2 border-[#007f36] relative shadow-xs">
                <span className="material-symbols-outlined text-[#007f36] text-sm absolute top-1.5 right-1.5 fill">
                  check_circle
                </span>
                <span className="font-manrope text-base font-bold text-[#006329] block">
                  5,000 mAh
                </span>
                <span className="font-mono-code text-xs text-[#131b2e] font-semibold">
                  45W Wired (68% in 30m)
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-[#c3c6d7]/40">
                <span className="font-manrope text-base font-bold text-[#131b2e] block">
                  4,685 mAh
                </span>
                <span className="font-mono-code text-xs text-[#131b2e] font-semibold">
                  27W Wired (52% in 30m)
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#f2f3ff]/40">
            <div className="text-[11px] text-[#737686] uppercase font-semibold mb-1">
              ApexTech Lab Active Endurance
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 border border-[#c3c6d7]/40 rounded-lg bg-white">
                <span className="font-bold text-xs md:text-sm text-[#131b2e] block">
                  16 hrs 42 mins
                </span>
                <span className="text-[11px] text-[#006329] block font-semibold">+1 hr 12m browsing delta</span>
              </div>
              <div className="p-2 border border-[#c3c6d7]/40 rounded-lg bg-white">
                <span className="font-bold text-xs md:text-sm text-[#131b2e] block">
                  17 hrs 04 mins
                </span>
                <span className="text-[11px] text-[#1d4ed8] block font-semibold">+22m video playback</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category 5: Value & Final Verdict */}
      <div className="mb-6 bg-white border border-[#c3c6d7]/60 rounded-xl overflow-hidden shadow-xs">
        <div className="bg-[#f2f3ff] px-4 py-2.5 border-b border-[#c3c6d7]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[20px]">verified</span>
            <span className="font-manrope text-sm font-bold text-[#131b2e]">5. Value &amp; Final Verdict</span>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#2563eb]/20 flex flex-col justify-between">
              <div>
                <span className="bg-[#004ac6] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Editor's Pick
                </span>
                <h3 className="font-manrope text-sm font-bold text-[#131b2e] mt-2">
                  Galaxy S25 Ultra
                </h3>
                <p className="text-xs text-[#434655] mt-1 leading-relaxed">
                  Best for power multitasking, camera telephoto flexibility, and brighter anti-glare screen.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[#c3c6d7]/30 flex items-center justify-between">
                <span className="font-mono-code text-xs text-[#737686]">Score</span>
                <span className="font-manrope text-lg font-extrabold text-[#004ac6]">9.4</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#c3c6d7]/40 flex flex-col justify-between">
              <div>
                <span className="bg-[#d2d9f4] text-[#131b2e] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Pro Video King
                </span>
                <h3 className="font-manrope text-sm font-bold text-[#131b2e] mt-2">
                  iPhone 16 Pro Max
                </h3>
                <p className="text-xs text-[#434655] mt-1 leading-relaxed">
                  Exceptional battery longevity in video streaming, best-in-class ProRes recording workflow.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[#c3c6d7]/30 flex items-center justify-between">
                <span className="font-mono-code text-xs text-[#737686]">Score</span>
                <span className="font-manrope text-lg font-extrabold text-[#131b2e]">9.3</span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenPdfExport}
            className="w-full py-3 bg-[#004ac6] hover:bg-[#1d4ed8] text-white text-sm font-semibold rounded-xl shadow-xs transition-all active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
            Export Full Comparison Report (PDF)
          </button>
        </div>
      </div>
    </main>
  );
};
