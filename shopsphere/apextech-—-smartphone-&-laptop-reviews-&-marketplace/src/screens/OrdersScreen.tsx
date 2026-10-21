import React, { useState } from 'react';
import { ScreenId, Order, Product } from '../types';

interface OrdersScreenProps {
  orders: Order[];
  onNavigate: (screen: ScreenId) => void;
  onAddToCart: (product: Product) => void;
  onOpenLiveTrack: (orderId: string, awb: string) => void;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({
  orders,
  onNavigate,
  onAddToCart,
  onOpenLiveTrack,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'transit' | 'delivered' | 'cancelled'>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [downloadedInvoiceId, setDownloadedInvoiceId] = useState<string | null>(null);

  const filteredOrders = orders.filter((o) => {
    if (activeTab === 'transit' && o.status !== 'In Transit') return false;
    if (activeTab === 'delivered' && o.status !== 'Delivered') return false;
    if (activeTab === 'cancelled' && o.status !== 'Cancelled') return false;

    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      const match =
        o.id.toLowerCase().includes(q) ||
        o.items.some((i) => i.product.name.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const handleDownloadInvoice = (orderId: string) => {
    setDownloadedInvoiceId(orderId);
    setTimeout(() => {
      setDownloadedInvoiceId(null);
      // Simulate PDF prompt
      alert(`Invoice for Order ${orderId} generated and downloaded.`);
    }, 1000);
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-24 flex-1">
      {/* Title and Search Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-manrope text-2xl md:text-3xl font-extrabold text-[#131b2e] tracking-tight">
            My Orders
          </h1>
          <p className="text-xs md:text-sm text-[#434655] mt-1">
            Track current shipments, review verified benchmarks, and manage invoices.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737686] text-[20px]">
            search
          </span>
          <input
            type="search"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search by Order ID, item, or serial..."
            className="w-full bg-white border border-[#c3c6d7] rounded-lg pl-10 pr-4 py-2 text-xs md:text-sm text-[#131b2e] placeholder:text-[#737686] focus:outline-none focus:border-[#2563eb] transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-[#c3c6d7]/40 mb-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shadow-xs transition-colors ${
            activeTab === 'all'
              ? 'bg-[#004ac6] text-white'
              : 'bg-white text-[#131b2e] border border-[#c3c6d7]/60 hover:bg-[#f2f3ff]'
          }`}
        >
          All Orders
        </button>

        <button
          onClick={() => setActiveTab('transit')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-colors shadow-xs ${
            activeTab === 'transit'
              ? 'bg-[#004ac6] text-white'
              : 'bg-white text-[#131b2e] border border-[#c3c6d7]/60 hover:bg-[#f2f3ff]'
          }`}
        >
          <span>In Transit</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code bg-[#dce1ff] text-[#001551] font-bold">
            1
          </span>
        </button>

        <button
          onClick={() => setActiveTab('delivered')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-colors shadow-xs ${
            activeTab === 'delivered'
              ? 'bg-[#004ac6] text-white'
              : 'bg-white text-[#131b2e] border border-[#c3c6d7]/60 hover:bg-[#f2f3ff]'
          }`}
        >
          <span>Delivered</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code bg-[#e2e7ff] text-[#434655] font-bold">
            4
          </span>
        </button>

        <button
          onClick={() => setActiveTab('cancelled')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-colors shadow-xs ${
            activeTab === 'cancelled'
              ? 'bg-[#004ac6] text-white'
              : 'bg-white text-[#434655] border border-[#c3c6d7]/60 hover:bg-[#f2f3ff]'
          }`}
        >
          <span>Cancelled</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code bg-[#eaedff] text-[#434655]">
            0
          </span>
        </button>
      </div>

      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-[#c3c6d7] p-8">
            <span className="material-symbols-outlined text-4xl text-[#737686]">inbox</span>
            <p className="font-bold text-sm text-[#131b2e] mt-2">No matching orders found</p>
            <p className="text-xs text-[#737686] mt-1">Try another filter or search term</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const isTransit = order.status === 'In Transit';
            const firstItem = order.items[0];

            return (
              <section
                key={order.id}
                className={`bg-white rounded-xl border overflow-hidden shadow-xs ${
                  isTransit
                    ? 'border-[#2563eb]/40 shadow-[0_4px_20px_-4px_rgba(0,74,198,0.12)]'
                    : 'border-[#c3c6d7]/50'
                }`}
              >
                {/* Order Header Strip */}
                <div className="bg-[#f2f3ff] px-4 md:px-6 py-3 border-b border-[#c3c6d7]/40 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        isTransit
                          ? 'bg-[#4069f2] text-white'
                          : 'bg-[#7ffc97] text-[#002109]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px] fill">
                        {isTransit ? 'local_shipping' : 'check_circle'}
                      </span>
                      {order.status}
                    </span>
                    <div className="font-mono-code text-xs font-medium text-[#131b2e]">
                      Order ID: <span className="font-bold text-[#004ac6]">{order.id}</span>
                    </div>
                  </div>
                  <div className="text-xs text-[#434655]">
                    Placed on <strong className="text-[#131b2e]">{order.date}</strong>
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Product Specs Column */}
                    <div className="lg:col-span-5 flex gap-4">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-[#f2f3ff] p-2 border border-[#c3c6d7]/50 shrink-0 flex items-center justify-center overflow-hidden">
                        <img
                          src={firstItem.product.image}
                          alt={firstItem.product.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <div>
                          <span className="font-mono-code text-[11px] text-[#004ac6] font-semibold tracking-wider uppercase">
                            {firstItem.product.category === 'smartphones' ? 'Flagship Mobile' : 'Pro Notebook'}
                          </span>
                          <h2 className="font-manrope text-sm md:text-base font-bold text-[#131b2e] mt-0.5">
                            {firstItem.product.name}
                          </h2>
                          <p className="text-xs text-[#434655] mt-0.5">
                            {firstItem.color} · {firstItem.storage}
                          </p>
                          <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded bg-[#7ffc97]/30 text-[#005320] font-mono-code text-[11px] font-semibold">
                            <span className="material-symbols-outlined text-[13px]">verified</span>
                            Apex Certified Specs
                          </div>
                        </div>

                        <div className="mt-2">
                          <div className="font-manrope text-base md:text-lg font-extrabold text-[#131b2e]">
                            ₹{order.totalPrice.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[11px] text-[#007f36] font-medium">
                            Free Express Air Courier Guaranteed
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stepper / Actions Column */}
                    {isTransit && order.trackingSteps ? (
                      <div className="lg:col-span-7 bg-[#f2f3ff]/60 rounded-xl p-4 border border-[#c3c6d7]/30 space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-[#c3c6d7]/30">
                          <span className="font-manrope text-xs md:text-sm font-bold text-[#131b2e] flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#004ac6] text-[18px]">near_me</span>
                            Real-time Shipment Lifecycle
                          </span>
                          <span className="font-mono-code text-xs text-[#434655]">
                            AWB: {order.awb}
                          </span>
                        </div>

                        {/* Stepper Timeline */}
                        <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#c3c6d7]/60">
                          {order.trackingSteps.map((step, sIdx) => (
                            <div key={sIdx} className="relative">
                              <div
                                className={`absolute -left-[24px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-xs ${
                                  step.completed
                                    ? 'bg-[#007f36] text-white'
                                    : step.current
                                    ? 'bg-[#004ac6] text-white ring-4 ring-[#004ac6]/20'
                                    : 'bg-[#eaedff] text-[#737686]'
                                }`}
                              >
                                {step.completed ? (
                                  <span className="material-symbols-outlined text-[14px]">check</span>
                                ) : (
                                  <span className="w-2 h-2 rounded-full bg-white" />
                                )}
                              </div>

                              <div className={step.current ? 'bg-white p-2.5 rounded-lg border border-[#004ac6]/30 shadow-xs' : ''}>
                                <div className="flex items-center justify-between">
                                  <h3 className="text-xs font-bold text-[#131b2e] flex items-center gap-1.5">
                                    <span>{step.title}</span>
                                    {step.current && (
                                      <span className="px-1.5 py-0.2 rounded-full bg-red-100 text-[#ba1a1a] text-[9px] font-bold uppercase">
                                        Active
                                      </span>
                                    )}
                                  </h3>
                                  <span className="text-[11px] font-mono-code text-[#737686]">{step.date}</span>
                                </div>
                                <p className="text-[11px] text-[#434655] mt-0.5">{step.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="pt-2 flex flex-wrap gap-2">
                          <button
                            onClick={() => onOpenLiveTrack(order.id, order.awb || 'BD-849103829IN')}
                            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 border-2 border-[#004ac6] text-[#004ac6] hover:bg-[#004ac6] hover:text-white transition-all rounded-lg px-4 py-2 text-xs font-bold active:scale-95 shadow-xs"
                          >
                            <span className="material-symbols-outlined text-[16px]">map</span>
                            Live Track Courier
                          </button>
                          <button
                            onClick={() => {
                              if (navigator.share) {
                                navigator.share({
                                  title: `Tracking ${order.id}`,
                                  text: `Tracking status for order ${order.id}: Out for Delivery today.`,
                                });
                              }
                            }}
                            className="inline-flex items-center justify-center gap-1 bg-white border border-[#c3c6d7] hover:bg-[#f2f3ff] text-[#131b2e] rounded-lg px-3 py-2 text-xs font-semibold"
                          >
                            <span className="material-symbols-outlined text-[16px]">share</span>
                            Share Tracking
                          </button>
                          <button
                            onClick={() => onNavigate('account')}
                            className="inline-flex items-center justify-center gap-1 bg-white border border-[#c3c6d7] hover:bg-[#f2f3ff] text-[#434655] hover:text-[#004ac6] rounded-lg px-3 py-2 text-xs font-semibold"
                          >
                            <span className="material-symbols-outlined text-[16px]">support_agent</span>
                            Need Help?
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Delivered Actions */
                      <div className="lg:col-span-7 flex flex-wrap md:flex-col lg:flex-row items-stretch md:items-end gap-2 w-full justify-end">
                        <button
                          onClick={() => handleDownloadInvoice(order.id)}
                          className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-[#c3c6d7] text-[#131b2e] hover:bg-[#f2f3ff] text-xs font-semibold shadow-xs active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[16px]">download</span>
                          {downloadedInvoiceId === order.id ? 'Downloading...' : 'Download Invoice (PDF)'}
                        </button>
                        <button
                          onClick={() => onAddToCart(firstItem.product)}
                          className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#283044] text-white hover:bg-black text-xs font-semibold shadow-xs active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[16px]">shopping_cart</span>
                          Buy Again
                        </button>
                        <button
                          onClick={() => alert(`Review submitted for ${firstItem.product.name}!`)}
                          className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#eaedff] text-[#004ac6] hover:bg-[#dbe1ff] text-xs font-semibold active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[16px]">rate_review</span>
                          Write Review
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          })
        )}
      </div>

      {/* Account Shortcuts Strip */}
      <section className="pt-8">
        <h2 className="font-manrope text-base font-bold text-[#131b2e] mb-3">
          Account Shortcuts &amp; Tech Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigate('account')}
            className="bg-white p-3 rounded-xl border border-[#c3c6d7]/40 hover:border-[#004ac6] transition-all flex items-center gap-3 text-left shadow-xs"
          >
            <div className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#004ac6] shrink-0">
              <span className="material-symbols-outlined text-[20px]">location_on</span>
            </div>
            <div>
              <div className="font-bold text-xs text-[#131b2e]">Saved Addresses</div>
              <div className="text-[11px] text-[#434655]">2 locations configured</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('account')}
            className="bg-white p-3 rounded-xl border border-[#c3c6d7]/40 hover:border-[#004ac6] transition-all flex items-center gap-3 text-left shadow-xs"
          >
            <div className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#004ac6] shrink-0">
              <span className="material-symbols-outlined text-[20px]">credit_card</span>
            </div>
            <div>
              <div className="font-bold text-xs text-[#131b2e]">Payment Methods</div>
              <div className="text-[11px] text-[#434655]">UPI &amp; Saved Cards</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('wishlist')}
            className="bg-white p-3 rounded-xl border border-[#c3c6d7]/40 hover:border-[#004ac6] transition-all flex items-center gap-3 text-left shadow-xs"
          >
            <div className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#004ac6] shrink-0">
              <span className="material-symbols-outlined text-[20px]">bookmark</span>
            </div>
            <div>
              <div className="font-bold text-xs text-[#131b2e]">Tech Wishlist</div>
              <div className="text-[11px] text-[#434655]">Saved hardware specs</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('account')}
            className="bg-white p-3 rounded-xl border border-[#c3c6d7]/40 hover:border-[#004ac6] transition-all flex items-center gap-3 text-left shadow-xs"
          >
            <div className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#004ac6] shrink-0">
              <span className="material-symbols-outlined text-[20px]">headset_mic</span>
            </div>
            <div>
              <div className="font-bold text-xs text-[#131b2e]">Support 24x7</div>
              <div className="text-[11px] text-[#434655]">Live hardware advisory</div>
            </div>
          </button>
        </div>
      </section>
    </main>
  );
};
