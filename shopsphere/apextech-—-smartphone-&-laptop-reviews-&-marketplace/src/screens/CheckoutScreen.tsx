import React, { useState } from 'react';
import { ScreenId, CartItem, UserProfile } from '../types';

interface CheckoutScreenProps {
  cartItems: CartItem[];
  user: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onPaymentSuccess: () => void;
  appliedPromo: string | null;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  cartItems,
  user,
  onNavigate,
  onPaymentSuccess,
  appliedPromo,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking' | 'emi' | 'cod'>('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');
  const [upiVpa, setUpiVpa] = useState('rohit@okhdfcbank');
  const [isVpaVerified, setIsVpaVerified] = useState(true);

  // Card details
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8921');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('789');
  const [cardName, setCardName] = useState(user.name);
  const [saveCard, setSaveCard] = useState(true);

  // Address modal
  const [selectedAddressId, setSelectedAddressId] = useState(user.addresses[0]?.id || 'addr-1');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Payment processing state
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedAddress = user.addresses.find((a) => a.id === selectedAddressId) || user.addresses[0];

  const itemsTotal = cartItems.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0
  );
  const discount = appliedPromo ? 20000 : 15000;
  const totalPayable = Math.max(0, itemsTotal - discount);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] pb-32 font-body-md text-[#131b2e]">
      {/* Transactional Focused Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-[#c3c6d7]/40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('cart')}
              className="p-1 rounded hover:bg-[#eaedff] text-[#131b2e]"
              title="Return to Cart"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <span className="font-manrope text-lg md:text-xl font-extrabold text-[#131b2e] flex items-center gap-1">
              Apex<span className="text-[#004ac6]">Tech</span>
            </span>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#eaedff] rounded-full text-[#004ac6] text-xs font-semibold">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              <span>Secure Checkout</span>
            </div>
          </div>

          {/* Stepper Progress */}
          <nav aria-label="Checkout Progress" className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 text-[#007f36]">
              <div className="w-5 h-5 rounded-full bg-[#007f36] text-white flex items-center justify-center text-xs">
                <span className="material-symbols-outlined text-[14px]">check</span>
              </div>
              <span className="text-xs hidden md:inline font-semibold">Address</span>
            </div>
            <div className="w-6 sm:w-10 h-0.5 bg-[#007f36]" />
            <div className="flex items-center gap-1 text-[#004ac6]">
              <div className="w-5 h-5 rounded-full bg-[#004ac6] text-white flex items-center justify-center text-xs font-bold ring-2 ring-[#dbe1ff]">
                2
              </div>
              <span className="text-xs text-[#004ac6] font-bold">Payment</span>
            </div>
            <div className="w-6 sm:w-10 h-0.5 bg-[#c3c6d7]/50" />
            <div className="flex items-center gap-1 text-[#737686]">
              <div className="w-5 h-5 rounded-full bg-[#eaedff] text-[#434655] flex items-center justify-center text-xs">
                3
              </div>
              <span className="text-xs hidden md:inline">Review</span>
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-1 text-[#434655] font-mono-code text-xs">
            <span className="material-symbols-outlined text-[16px] text-[#007f36]">verified_user</span>
            <span>256-BIT SSL ENCRYPTION</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Checkout Operations (8 Cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* Selected Delivery Address Card */}
            <section className="bg-white rounded-xl border border-[#c3c6d7]/50 p-4 md:p-5 shadow-xs">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#004ac6] text-[22px]">location_on</span>
                  <div className="flex items-center gap-2">
                    <h2 className="font-manrope text-sm md:text-base font-bold text-[#131b2e]">
                      Delivering to {selectedAddress.recipient}
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#004ac6] font-mono-code text-[10px] font-bold uppercase">
                      {selectedAddress.tag}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddressModalOpen(true)}
                  className="text-[#004ac6] hover:text-[#1d4ed8] text-xs font-semibold inline-flex items-center gap-1"
                >
                  <span>Change Address</span>
                  <span className="material-symbols-outlined text-[14px]">edit</span>
                </button>
              </div>

              <div className="text-xs text-[#434655] space-y-1 ml-7">
                <p className="leading-relaxed text-[#131b2e] font-medium">
                  {selectedAddress.addressLine}, {selectedAddress.city} {selectedAddress.pincode}
                </p>
                <p className="flex items-center gap-1 font-mono-code text-[#737686]">
                  <span className="material-symbols-outlined text-[14px]">call</span>
                  <span>{selectedAddress.phone}</span>
                </p>
              </div>
            </section>

            {/* Payment Method Selector */}
            <section className="space-y-3">
              <div className="flex items-center justify-between pb-1">
                <h1 className="font-manrope text-base md:text-lg font-bold text-[#131b2e] tracking-tight">
                  Choose Payment Method
                </h1>
                <span className="text-[11px] text-[#007f36] flex items-center gap-1 bg-white px-2.5 py-1 rounded border border-[#c3c6d7]/40">
                  <span className="material-symbols-outlined text-[14px]">bolt</span> 100% Instant Confirmation
                </span>
              </div>

              {/* Method 1: UPI */}
              <div
                className={`bg-white rounded-xl border-2 transition-all duration-200 overflow-hidden shadow-xs ${
                  selectedMethod === 'upi' ? 'border-[#004ac6]' : 'border-[#c3c6d7]/50'
                }`}
              >
                <div
                  onClick={() => setSelectedMethod('upi')}
                  className="p-4 bg-[#f2f3ff]/40 flex items-center justify-between cursor-pointer border-b border-[#c3c6d7]/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-[#004ac6] flex items-center justify-center bg-white">
                      {selectedMethod === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-[#004ac6]" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-manrope text-sm font-bold text-[#131b2e]">UPI</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#7ffc97] text-[#002109] font-mono-code text-[10px] font-bold">
                          INSTANT &amp; NO CHARGES
                        </span>
                      </div>
                      <p className="text-xs text-[#434655]">Pay directly via your bank apps</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#004ac6] text-[24px]">account_balance_wallet</span>
                </div>

                {selectedMethod === 'upi' && (
                  <div className="p-4 space-y-4">
                    {/* 1-Tap Fast App Selector */}
                    <div>
                      <label className="block text-xs font-semibold text-[#434655] mb-2">
                        Select Fast UPI App
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {/* Google Pay */}
                        <button
                          type="button"
                          onClick={() => setSelectedUpiApp('gpay')}
                          className={`relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                            selectedUpiApp === 'gpay'
                              ? 'border-[#004ac6] bg-[#dbe1ff]/30'
                              : 'border-[#c3c6d7]/60 bg-white hover:border-[#737686]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs mb-1">
                            <span className="material-symbols-outlined text-[#004ac6] text-[20px]">account_balance</span>
                          </div>
                          <span className="text-xs font-semibold text-[#131b2e]">Google Pay</span>
                          {selectedUpiApp === 'gpay' && (
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#004ac6]" />
                          )}
                        </button>

                        {/* PhonePe */}
                        <button
                          type="button"
                          onClick={() => setSelectedUpiApp('phonepe')}
                          className={`relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                            selectedUpiApp === 'phonepe'
                              ? 'border-[#004ac6] bg-[#dbe1ff]/30'
                              : 'border-[#c3c6d7]/60 bg-white hover:border-[#737686]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center shadow-xs mb-1">
                            <span className="material-symbols-outlined text-[#1d4ed8] text-[20px]">payments</span>
                          </div>
                          <span className="text-xs font-semibold text-[#131b2e]">PhonePe</span>
                          {selectedUpiApp === 'phonepe' && (
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#004ac6]" />
                          )}
                        </button>

                        {/* Paytm */}
                        <button
                          type="button"
                          onClick={() => setSelectedUpiApp('paytm')}
                          className={`relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                            selectedUpiApp === 'paytm'
                              ? 'border-[#004ac6] bg-[#dbe1ff]/30'
                              : 'border-[#c3c6d7]/60 bg-white hover:border-[#737686]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center shadow-xs mb-1">
                            <span className="material-symbols-outlined text-[#131b2e] text-[20px]">contactless</span>
                          </div>
                          <span className="text-xs font-semibold text-[#131b2e]">Paytm</span>
                          {selectedUpiApp === 'paytm' && (
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#004ac6]" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* OR Divider */}
                    <div className="relative flex items-center">
                      <div className="flex-grow border-t border-[#c3c6d7]/40" />
                      <span className="flex-shrink mx-4 font-mono-code text-[11px] text-[#737686]">
                        OR ENTER UPI ID
                      </span>
                      <div className="flex-grow border-t border-[#c3c6d7]/40" />
                    </div>

                    {/* UPI ID verification */}
                    <div>
                      <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                        Enter Virtual Payment Address (VPA)
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-grow">
                          <input
                            type="text"
                            value={upiVpa}
                            onChange={(e) => setUpiVpa(e.target.value)}
                            className="w-full bg-white border border-[#c3c6d7] rounded-lg px-3.5 py-2 font-mono-code text-xs text-[#131b2e] focus:outline-none focus:border-[#2563eb]"
                          />
                          {isVpaVerified && (
                            <span className="material-symbols-outlined text-[#007f36] absolute right-3 top-2 text-[18px]">
                              check_circle
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsVpaVerified(true)}
                          className="bg-[#eaedff] text-[#004ac6] text-xs font-bold px-4 rounded-lg"
                        >
                          Verified
                        </button>
                      </div>
                      <p className="text-xs text-[#007f36] mt-1.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        Verified: Rohit Rajput (HDFC Bank)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Method 2: Credit / Debit Cards */}
              <div
                className={`bg-white rounded-xl border overflow-hidden shadow-xs transition-all ${
                  selectedMethod === 'card' ? 'border-[#004ac6]' : 'border-[#c3c6d7]/50'
                }`}
              >
                <div
                  onClick={() => setSelectedMethod('card')}
                  className="p-4 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-[#737686] flex items-center justify-center bg-white">
                      {selectedMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-[#004ac6]" />}
                    </div>
                    <div>
                      <span className="font-manrope text-sm font-bold text-[#131b2e]">Credit / Debit Cards</span>
                      <p className="text-xs text-[#434655]">Visa, Mastercard, RuPay, Amex</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[#434655]">
                    <span className="material-symbols-outlined text-[22px]">credit_card</span>
                    <span className="material-symbols-outlined text-[18px]">
                      {selectedMethod === 'card' ? 'expand_less' : 'expand_more'}
                    </span>
                  </div>
                </div>

                {selectedMethod === 'card' && (
                  <div className="px-4 pb-4 pt-1 space-y-3 border-t border-[#c3c6d7]/30">
                    <div>
                      <label className="block text-xs font-semibold text-[#131b2e] mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white border border-[#c3c6d7] rounded-lg px-3.5 py-2 font-mono-code text-xs text-[#131b2e]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#131b2e] mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-white border border-[#c3c6d7] rounded-lg px-3.5 py-2 font-mono-code text-xs text-[#131b2e]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#131b2e] mb-1">CVV</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          maxLength={4}
                          className="w-full bg-white border border-[#c3c6d7] rounded-lg px-3.5 py-2 font-mono-code text-xs text-[#131b2e]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#131b2e] mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full bg-white border border-[#c3c6d7] rounded-lg px-3.5 py-2 text-xs text-[#131b2e]"
                      />
                    </div>
                    <div className="flex items-start gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="save-card"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="mt-0.5 rounded text-[#2563eb]"
                      />
                      <label htmlFor="save-card" className="text-xs text-[#434655] leading-tight">
                        <strong>Save this card securely</strong> as per RBI tokenization guidelines. ApexTech does not store sensitive CVV codes.
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Method 3: Net Banking */}
              <div
                onClick={() => setSelectedMethod('netbanking')}
                className={`bg-white rounded-xl border p-4 flex items-center justify-between cursor-pointer transition-all shadow-xs ${
                  selectedMethod === 'netbanking' ? 'border-[#004ac6]' : 'border-[#c3c6d7]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border border-[#737686] flex items-center justify-center bg-white">
                    {selectedMethod === 'netbanking' && <div className="w-2.5 h-2.5 rounded-full bg-[#004ac6]" />}
                  </div>
                  <div>
                    <span className="font-manrope text-sm font-bold text-[#131b2e]">Net Banking</span>
                    <p className="text-xs text-[#434655]">All major Indian &amp; international banks supported</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#434655] text-[22px]">account_balance</span>
              </div>

              {/* Method 4: EMI */}
              <div
                onClick={() => setSelectedMethod('emi')}
                className={`bg-white rounded-xl border p-4 flex items-center justify-between cursor-pointer transition-all shadow-xs ${
                  selectedMethod === 'emi' ? 'border-[#004ac6]' : 'border-[#c3c6d7]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border border-[#737686] flex items-center justify-center bg-white">
                    {selectedMethod === 'emi' && <div className="w-2.5 h-2.5 rounded-full bg-[#004ac6]" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-manrope text-sm font-bold text-[#131b2e]">Easy EMI Options</span>
                      <span className="px-2 py-0.5 rounded bg-[#eaedff] text-[#004ac6] font-mono-code text-[10px] font-semibold">
                        LOW INTEREST
                      </span>
                    </div>
                    <p className="text-xs text-[#434655]">Starting from ₹11,250/mo on credit card</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#434655] text-[22px]">calendar_month</span>
              </div>

              {/* Method 5: COD */}
              <div
                onClick={() => setSelectedMethod('cod')}
                className={`bg-white rounded-xl border p-4 flex items-center justify-between cursor-pointer transition-all shadow-xs ${
                  selectedMethod === 'cod' ? 'border-[#004ac6]' : 'border-[#c3c6d7]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border border-[#737686] flex items-center justify-center bg-white">
                    {selectedMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-[#004ac6]" />}
                  </div>
                  <div>
                    <span className="font-manrope text-sm font-bold text-[#131b2e]">Cash / Card on Delivery</span>
                    <p className="text-xs text-[#434655]">Requires security verification PIN upon courier arrival</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#434655] text-[22px]">local_shipping</span>
              </div>
            </section>

            {/* Trust Badges */}
            <div className="bg-[#f2f3ff]/60 rounded-xl border border-[#c3c6d7]/30 p-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#434655]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#004ac6] text-[18px]">lock</span>
                <span>256-Bit Bank Grade Encryption</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#007f36] text-[18px]">verified</span>
                <span>PCI-DSS Level 1 Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#1d4ed8] text-[18px]">security</span>
                <span>ApexTech Zero Fraud Liability</span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary (4-5 Cols) */}
          <aside className="lg:col-span-5 xl:col-span-4 space-y-4">
            <div className="bg-white rounded-xl border border-[#c3c6d7]/50 shadow-xs p-4 md:p-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#c3c6d7]/30">
                <h2 className="font-manrope text-base font-bold text-[#131b2e]">Order Summary</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#004ac6] font-mono-code text-xs font-bold">
                  {cartItems.length} ITEMS
                </span>
              </div>

              {/* Items Breakdown */}
              <div className="py-3 space-y-3 border-b border-[#c3c6d7]/30">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-14 rounded-lg bg-[#f2f3ff] border border-[#c3c6d7]/40 flex-shrink-0 flex items-center justify-center p-1 overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start gap-1">
                        <h3 className="font-semibold text-xs text-[#131b2e] truncate">
                          {item.product.name}
                        </h3>
                        <span className="font-mono-code text-xs font-bold text-[#131b2e]">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#434655]">
                        {item.selectedColor || 'Phantom Titanium'} · {item.selectedStorage || '256GB'}
                      </p>
                      <div className="flex items-center justify-between mt-1 text-[11px]">
                        <span className="text-[#007f36] bg-[#7ffc97]/20 px-1.5 py-0.2 rounded font-mono-code">
                          In Stock · Express Dispatch
                        </span>
                        <span className="text-[#737686] font-mono-code">Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="py-3 space-y-2 text-xs border-b border-[#c3c6d7]/30">
                <div className="flex justify-between text-[#434655]">
                  <span>Subtotal (MRP incl. taxes)</span>
                  <span className="font-mono-code text-[#131b2e]">
                    ₹{itemsTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-[#006329] font-medium">
                  <span className="flex items-center gap-1">
                    <span>ApexTech Privilege Discount</span>
                    <span className="material-symbols-outlined text-[15px]">sell</span>
                  </span>
                  <span className="font-mono-code">-₹{discount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#434655]">
                  <span>Secured Express Delivery</span>
                  <span className="font-mono-code text-[#006329] font-bold">FREE</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="pt-3 pb-2 flex justify-between items-baseline">
                <div>
                  <span className="font-manrope text-sm font-bold text-[#131b2e] block">
                    Total Payable
                  </span>
                  <span className="text-[11px] text-[#434655]">Inclusive of all GST &amp; duties</span>
                </div>
                <div className="text-right">
                  <span className="font-manrope text-xl md:text-2xl font-extrabold text-[#004ac6] tracking-tight">
                    ₹{totalPayable.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Desktop Pay Trigger */}
              <div className="hidden md:block pt-3">
                <button
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="w-full bg-[#004ac6] hover:bg-[#1d4ed8] text-white py-3.5 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99]"
                >
                  {isProcessing ? (
                    <>
                      <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                      <span>Authorizing Payment...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">lock</span>
                      <span>Pay ₹{totalPayable.toLocaleString('en-IN')} Securely</span>
                    </>
                  )}
                </button>
                <p className="font-mono-code text-[11px] text-center text-[#737686] mt-2 flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#007f36]">bolt</span> Instant UPI authentication token requested
                </p>
              </div>
            </div>

            {/* Official Warranty */}
            <div className="bg-[#f2f3ff] rounded-xl p-3 border border-[#c3c6d7]/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#004ac6] shadow-xs shrink-0">
                <span className="material-symbols-outlined text-[24px]">verified_user</span>
              </div>
              <div className="text-xs text-[#434655]">
                <p className="font-bold text-[#131b2e]">1-Year Official Brand Warranty</p>
                <p>Full transit insurance included for electronics.</p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Sticky Bottom Dock on Mobile */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-[#c3c6d7]/40 shadow-lg px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#434655]">Total Payable</span>
            <span className="font-manrope text-base font-extrabold text-[#004ac6]">
              ₹{totalPayable.toLocaleString('en-IN')}
            </span>
          </div>
          <button
            onClick={handlePay}
            disabled={isProcessing}
            className="flex-grow max-w-[220px] bg-[#004ac6] hover:bg-[#1d4ed8] text-white py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-md active:scale-95"
          >
            {isProcessing ? (
              <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
            ) : (
              <span className="material-symbols-outlined text-[18px]">lock</span>
            )}
            <span>Pay Securely</span>
          </button>
        </div>
      </div>

      {/* Address Switcher Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-[#283044]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-[#c3c6d7]/40 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#c3c6d7]/30">
              <h3 className="font-manrope text-base font-bold text-[#131b2e]">
                Select Delivery Address
              </h3>
              <button onClick={() => setIsAddressModalOpen(false)} className="p-1 text-[#737686]">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3">
              {user.addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => {
                    setSelectedAddressId(addr.id);
                    setIsAddressModalOpen(false);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedAddressId === addr.id
                      ? 'border-[#004ac6] bg-[#eaedff]/40 ring-1 ring-[#004ac6]'
                      : 'border-[#c3c6d7]/50 hover:bg-[#f2f3ff]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-[#131b2e]">{addr.recipient}</span>
                    <span className="font-mono-code text-[10px] bg-slate-200 px-2 py-0.5 rounded font-bold">
                      {addr.tag}
                    </span>
                  </div>
                  <p className="text-xs text-[#434655]">
                    {addr.addressLine}, {addr.city} {addr.pincode}
                  </p>
                  <p className="text-[11px] text-[#737686] font-mono-code mt-1">{addr.phone}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsAddressModalOpen(false)}
              className="w-full bg-[#2563eb] text-white py-2 rounded-lg text-xs font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
