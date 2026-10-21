import React, { useState } from 'react';
import { ScreenId, UserProfile } from '../types';

interface AccountScreenProps {
  user: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onOpenSupport: () => void;
  onLogout: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({
  user,
  onNavigate,
  onOpenSupport,
  onLogout,
}) => {
  const [activeAddressModal, setActiveAddressModal] = useState(false);
  const [activeSecurityModal, setActiveSecurityModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex flex-col relative pb-28 pt-2 px-4 space-y-4">
      {/* Top Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 -mx-4 px-4 py-2 border-b border-[#c3c6d7]/50 flex justify-between items-center shadow-xs">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#004ac6] text-2xl">terminal</span>
          <span className="font-manrope text-xl font-extrabold text-[#131b2e]">
            ApexTech
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#434655] hover:text-[#004ac6] hover:bg-[#eaedff] transition-colors"
            title="Toggle theme appearance"
          >
            <span className="material-symbols-outlined text-[20px]">
              {darkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button
            onClick={() => setActiveSecurityModal(true)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#434655] hover:text-[#004ac6] hover:bg-[#eaedff] transition-colors"
            title="Settings"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
          </button>
        </div>
      </header>

      {/* Profile Summary Card with Bento Grid */}
      <section className="bg-white rounded-2xl p-4 border border-[#c3c6d7]/60 shadow-xs relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-36 h-36 bg-[#eaedff]/60 rounded-full blur-2xl pointer-events-none" />

        {/* Identity Row */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-full bg-[#004ac6] flex items-center justify-center text-white font-manrope text-xl font-bold ring-4 ring-[#dbe1ff] shadow-xs">
              {user.avatarText}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#006329] text-white rounded-full p-0.5 border-2 border-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[13px] fill">verified</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-manrope text-lg font-bold text-[#131b2e] truncate">
                {user.name}
              </h1>
              <span className="inline-flex items-center gap-1 bg-[#eaedff] px-2 py-0.5 rounded-full border border-[#c3c6d7]/40">
                <span className="material-symbols-outlined text-[#004ac6] text-[13px] fill">bolt</span>
                <span className="font-mono-code text-[10px] uppercase font-bold text-[#004ac6]">
                  {user.tier}
                </span>
              </span>
            </div>
            <p className="text-xs text-[#434655] truncate mt-0.5">{user.email}</p>
            <div className="flex items-center gap-1 mt-1 text-[#737686]">
              <span className="material-symbols-outlined text-[13px]">location_on</span>
              <span className="text-[11px]">Bengaluru, IN • Tier 1 Hub</span>
            </div>
          </div>
        </div>

        {/* Bento Stats Banner */}
        <div className="mt-4 pt-3 border-t border-[#c3c6d7]/40 grid grid-cols-3 divide-x divide-[#c3c6d7]/40 bg-[#f2f3ff]/60 rounded-xl py-2.5">
          <div
            onClick={() => onNavigate('orders')}
            className="text-center px-1 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="font-manrope text-base font-bold text-[#131b2e]">{user.ordersCount}</div>
            <div className="font-mono-code text-[10px] text-[#434655] mt-0.5">Orders</div>
          </div>

          <div
            onClick={() => onNavigate('wishlist')}
            className="text-center px-1 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="font-manrope text-base font-bold text-[#131b2e]">{user.savedDevicesCount}</div>
            <div className="font-mono-code text-[10px] text-[#434655] mt-0.5">Saved Devices</div>
          </div>

          <div className="text-center px-1">
            <div className="font-manrope text-base font-bold text-[#006329]">₹{user.credits.toLocaleString('en-IN')}</div>
            <div className="font-mono-code text-[10px] text-[#006329] mt-0.5 font-semibold">Credits</div>
          </div>
        </div>
      </section>

      {/* Category 1: Orders & Purchases */}
      <section className="space-y-1.5">
        <h2 className="text-xs text-[#737686] font-bold tracking-wider uppercase px-1">
          Orders &amp; Purchases
        </h2>
        <div className="bg-white rounded-xl border border-[#c3c6d7]/50 divide-y divide-[#c3c6d7]/30 overflow-hidden shadow-xs">
          <button
            onClick={() => onNavigate('orders')}
            className="w-full flex items-center justify-between p-3.5 hover:bg-[#f2f3ff] transition-colors text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#004ac6] shrink-0">
                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-xs text-[#131b2e] block truncate">
                  My Orders &amp; Live Tracking
                </span>
                <span className="text-[11px] text-[#434655] truncate block">
                  MacBook Pro M3 Max Delivery
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 pl-2">
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-[#006329] border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#007f36] animate-pulse" />
                1 In Transit
              </span>
              <span className="material-symbols-outlined text-[#737686] text-[18px]">chevron_right</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('orders')}
            className="w-full flex items-center justify-between p-3.5 hover:bg-[#f2f3ff] transition-colors text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#434655] shrink-0">
                <span className="material-symbols-outlined text-[20px]">receipt_long</span>
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-xs text-[#131b2e] block truncate">
                  Download Invoices &amp; Tax Receipts
                </span>
                <span className="text-[11px] text-[#434655] truncate block">
                  GST invoices &amp; corporate bills
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#737686] text-[18px]">chevron_right</span>
          </button>

          <div className="w-full flex items-center justify-between p-3.5 hover:bg-[#f2f3ff] transition-colors text-left">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#434655] shrink-0">
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-xs text-[#131b2e] block truncate">
                  Hardware Warranty &amp; Protection Plans
                </span>
                <span className="text-[11px] text-[#434655] truncate block">
                  2 active AppleCare+ &amp; ApexCare packs
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#737686] text-[18px]">chevron_right</span>
          </div>
        </div>
      </section>

      {/* Category 2: Account & Security */}
      <section className="space-y-1.5">
        <h2 className="text-xs text-[#737686] font-bold tracking-wider uppercase px-1">
          Account &amp; Security
        </h2>
        <div className="bg-white rounded-xl border border-[#c3c6d7]/50 divide-y divide-[#c3c6d7]/30 overflow-hidden shadow-xs">
          <button
            onClick={() => setActiveAddressModal(true)}
            className="w-full flex items-center justify-between p-3.5 hover:bg-[#f2f3ff] transition-colors text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#434655] shrink-0">
                <span className="material-symbols-outlined text-[20px]">home_pin</span>
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-xs text-[#131b2e] block truncate">
                  Saved Addresses
                </span>
                <span className="text-[11px] text-[#434655] truncate block">
                  Home, Studio Lab
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="font-mono-code text-[10px] text-[#737686] bg-[#eaedff] px-2 py-0.5 rounded font-semibold">
                2 configured
              </span>
              <span className="material-symbols-outlined text-[#737686] text-[18px]">chevron_right</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('checkout')}
            className="w-full flex items-center justify-between p-3.5 hover:bg-[#f2f3ff] transition-colors text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#434655] shrink-0">
                <span className="material-symbols-outlined text-[20px]">credit_card</span>
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-xs text-[#131b2e] block truncate">
                  Payment Methods &amp; Saved UPI
                </span>
                <span className="text-[11px] text-[#434655] truncate block">
                  HDFC Millennia •••• 4092, Google Pay
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#737686] text-[18px]">chevron_right</span>
          </button>

          <button
            onClick={() => setActiveSecurityModal(true)}
            className="w-full flex items-center justify-between p-3.5 hover:bg-[#f2f3ff] transition-colors text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#434655] shrink-0">
                <span className="material-symbols-outlined text-[20px]">lock_clock</span>
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-xs text-[#131b2e] block truncate">
                  Security &amp; Password
                </span>
                <span className="text-[11px] text-[#434655] truncate block">
                  Passkeys, Hardware Security Key
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="inline-flex items-center gap-1 text-[10px] text-[#006329] font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                <span className="material-symbols-outlined text-[13px]">shield</span>
                2FA Enabled
              </span>
              <span className="material-symbols-outlined text-[#737686] text-[18px]">chevron_right</span>
            </div>
          </button>
        </div>
      </section>

      {/* Category 3: Tech Preferences & Tools */}
      <section className="space-y-1.5">
        <h2 className="text-xs text-[#737686] font-bold tracking-wider uppercase px-1">
          Tech Preferences &amp; Tools
        </h2>
        <div className="bg-white rounded-xl border border-[#c3c6d7]/50 divide-y divide-[#c3c6d7]/30 overflow-hidden shadow-xs">
          <button
            onClick={() => onNavigate('compare')}
            className="w-full flex items-center justify-between p-3.5 hover:bg-[#f2f3ff] transition-colors text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#434655] shrink-0">
                <span className="material-symbols-outlined text-[20px]">compare_arrows</span>
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-xs text-[#131b2e] block truncate">
                  Saved Hardware Comparisons
                </span>
                <span className="text-[11px] text-[#434655] truncate block">
                  3 saved showdowns (S24 Ultra vs 16 Pro)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="font-mono-code text-[10px] text-[#004ac6] bg-[#dbe1ff] px-2 py-0.5 rounded font-bold">
                3 Active
              </span>
              <span className="material-symbols-outlined text-[#737686] text-[18px]">chevron_right</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('deals')}
            className="w-full flex items-center justify-between p-3.5 hover:bg-[#f2f3ff] transition-colors text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#434655] shrink-0">
                <span className="material-symbols-outlined text-[20px]">notifications_active</span>
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-xs text-[#131b2e] block truncate">
                  Price Drop Notification Alerts
                </span>
                <span className="text-[11px] text-[#434655] truncate block">
                  Tracking Asus ROG Zephyrus G16 target
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#737686] text-[18px]">chevron_right</span>
          </button>

          <button
            onClick={() => onNavigate('deals')}
            className="w-full flex items-center justify-between p-3.5 hover:bg-[#f2f3ff] transition-colors text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#434655] shrink-0">
                <span className="material-symbols-outlined text-[20px]">published_with_changes</span>
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-xs text-[#131b2e] block truncate">
                  Trade-in &amp; Device Valuation History
                </span>
                <span className="text-[11px] text-[#434655] truncate block">
                  Last evaluated: iPhone 14 Pro Max
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#737686] text-[18px]">chevron_right</span>
          </button>
        </div>
      </section>

      {/* Category 4: Support & Legal */}
      <section className="space-y-1.5">
        <h2 className="text-xs text-[#737686] font-bold tracking-wider uppercase px-1">
          Support &amp; Legal
        </h2>
        <div className="bg-white rounded-xl border border-[#c3c6d7]/50 divide-y divide-[#c3c6d7]/30 overflow-hidden shadow-xs">
          <button
            onClick={onOpenSupport}
            className="w-full flex items-center justify-between p-3.5 hover:bg-[#f2f3ff] transition-colors text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#434655] shrink-0">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-xs text-[#131b2e] block truncate">
                  24x7 Hardware Specialist Support
                </span>
                <span className="text-[11px] text-[#434655] truncate block">
                  Direct engineer chat &amp; concierge ticket
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#737686] text-[18px]">chevron_right</span>
          </button>

          <div className="w-full flex items-center justify-between p-3.5 hover:bg-[#f2f3ff] transition-colors text-left">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#434655] shrink-0">
                <span className="material-symbols-outlined text-[20px]">menu_book</span>
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-xs text-[#131b2e] block truncate">
                  Editorial &amp; Benchmark Testing Policy
                </span>
                <span className="text-[11px] text-[#434655] truncate block">
                  Rigorous Geekbench, Cinebench standards
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#737686] text-[18px]">chevron_right</span>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-between p-3.5 hover:bg-red-50 text-left transition-colors group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center text-[#ba1a1a] shrink-0">
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-xs text-[#ba1a1a] block truncate">
                  Log Out
                </span>
                <span className="text-[11px] text-[#434655] truncate block">
                  Signed in on 3 authorized devices
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-red-400 group-hover:text-[#ba1a1a] text-[18px]">
              chevron_right
            </span>
          </button>
        </div>
      </section>

      {/* Meta Footer */}
      <div className="pt-2 pb-6 text-center text-xs text-[#737686]">
        <p className="font-mono-code text-[11px]">ApexTech Mobile Suite v4.12.0 (Build 9024)</p>
        <p className="text-[11px] text-[#737686] mt-0.5">
          Device Benchmark Engine Active • Level 3 SSL
        </p>
      </div>

      {/* Address Management Modal */}
      {activeAddressModal && (
        <div className="fixed inset-0 bg-[#283044]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-[#c3c6d7]/40 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#c3c6d7]/30">
              <h3 className="font-manrope text-base font-bold text-[#131b2e]">
                Saved Addresses
              </h3>
              <button onClick={() => setActiveAddressModal(false)} className="p-1 text-[#737686]">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3">
              {user.addresses.map((addr) => (
                <div key={addr.id} className="p-3 rounded-xl border border-[#c3c6d7]/40 bg-[#f2f3ff]/40 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-[#131b2e]">{addr.recipient}</span>
                    <span className="font-mono-code text-[10px] bg-slate-200 px-2 py-0.5 rounded font-bold">
                      {addr.tag}
                    </span>
                  </div>
                  <p className="text-xs text-[#434655]">
                    {addr.addressLine}, {addr.city} {addr.pincode}
                  </p>
                  <p className="text-[11px] text-[#737686] font-mono-code">{addr.phone}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveAddressModal(false)}
              className="w-full bg-[#004ac6] text-white py-2 rounded-lg text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Security & 2FA Modal */}
      {activeSecurityModal && (
        <div className="fixed inset-0 bg-[#283044]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-[#c3c6d7]/40 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#c3c6d7]/30">
              <h3 className="font-manrope text-base font-bold text-[#131b2e]">
                Security Credentials
              </h3>
              <button onClick={() => setActiveSecurityModal(false)} className="p-1 text-[#737686]">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#434655]">
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#007f36]">security</span>
                  <div>
                    <p className="font-bold text-[#131b2e]">Two-Factor Authentication (2FA)</p>
                    <p className="text-[11px] text-[#007f36]">Active via Authenticator App</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#007f36]">Configured</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-xl border border-[#c3c6d7]/40">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#004ac6]">key</span>
                  <div>
                    <p className="font-bold text-[#131b2e]">Hardware Passkeys</p>
                    <p className="text-[11px] text-[#737686]">FIDO2 / TouchID / Windows Hello</p>
                  </div>
                </div>
                <button className="text-[#004ac6] font-semibold hover:underline">Manage</button>
              </div>
            </div>

            <button
              onClick={() => setActiveSecurityModal(false)}
              className="w-full bg-[#004ac6] text-white py-2 rounded-lg text-xs font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
